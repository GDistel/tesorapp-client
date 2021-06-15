import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddExpensesListParticipantRequest, CreateExpensesListRequest, ExpensesList } from './../expenses-lists/interfaces';
import { ExpensesListsService } from './../expenses-lists/expenses-lists.service';
import { TopNavService } from '../core/top-nav/top-nav.service';
import { Currencies } from '../expenses-lists/enums';
import { Participant } from '../expenses-list/interfaces';

@Component({
  templateUrl: './add-expenses-list.component.html',
  styleUrls: ['./add-expenses-list.component.scss']
})
export class AddExpensesListComponent implements OnInit {
  form!: FormGroup;
  currencies!: string[];
  expensesList!: ExpensesList;
  editMode = true;

  constructor(
    private expensesListsSvc: ExpensesListsService,
    private topNavSvc: TopNavService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavBackLinkSubject().next('/expenses-lists');
    this.topNavSvc.getTopNavTitleSubject().next('Add expenses List');
    const expensesListId = this.activatedRoute.snapshot.queryParams.expensesListId;
    if (expensesListId) {
      this.expensesList = await this.expensesListsSvc.getExpensesList(expensesListId);
      this.populateFormWithExpenseListData();
      this.topNavSvc.getTopNavTitleSubject().next('Edit expenses List');
    }
    this.currencies = Object.values(Currencies).filter(x => isNaN(+x)); // convert enum to array of values
  }

  createForm(): void {
    this.form = new FormGroup({
      expensesList: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
        description: new FormControl('', Validators.maxLength(40)),
        currency: new FormControl(null, Validators.required),
      }),
      participants: new FormArray([])
    });
    this.addParticipant();
    this.addParticipant(); // minimum two participants for an expenses list
  }

  populateFormWithExpenseListData(): void {
    const { participants, id, userId, status, ...partialExpensesList } = this.expensesList;
    this.form.get('expensesList')?.patchValue(partialExpensesList);
    this.form.setControl('participants', this.setExistingParticipants(participants))
    this.form.disable();
    this.editMode = false;
  }

  setExistingParticipants(participants: Participant[] | undefined): FormArray {
    const formArray = new FormArray([]);
    if (!participants) {
      return formArray;
    }
    for (const participant of participants) {
      const control = new FormControl(participant.name, [
        Validators.required, Validators.minLength(1), Validators.maxLength(40)]
      );
      formArray.push(control);
    }
    return formArray;
  }

  get participants() {
    return this.form.controls.participants as FormArray;
  }

  addParticipant() {
    const control = new FormControl(null, [
      Validators.required, Validators.minLength(1), Validators.maxLength(40)]
    );
    this.participants.push(control);
  }

  removeParticipant(index: number) {
    this.participants.removeAt(index);
  }

  async onFormSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    if (this.expensesList) {
      await this.updateExpensesList();
      return;
    }
    await this.createNewExpensesList();
  }

  async updateExpensesList(): Promise<void> {
    const req: CreateExpensesListRequest = { ...this.form.value.expensesList };
    if (!req.description) {
      req.description = 'expenses-list';
    }
    try {
      const expensesList = await this.expensesListsSvc.updateExpensesList(req, this.expensesList.id.toString());
      // @TODO Implement the functionality to PUT participants
      for (const participant of this.form.value.participants) {
        const addParticipantReq: AddExpensesListParticipantRequest = {
          name: participant, listId: expensesList.id
        };
        await this.expensesListsSvc.addExpensesListParticipant(addParticipantReq);
      }
    } catch(error) {
      console.error(error);
    }
  }

  async createNewExpensesList(): Promise<void> {
    const req: CreateExpensesListRequest = { ...this.form.value.expensesList };
    if (!req.description) {
      req.description = 'expenses-list';
    }
    try {
      const expensesList = await this.expensesListsSvc.createExpensesList(req);
      // @TODO this has to be a single request to the server, adjust the server
      for (const participant of this.form.value.participants) {
        const addParticipantReq: AddExpensesListParticipantRequest = {
          name: participant, listId: expensesList.id
        };
        await this.expensesListsSvc.addExpensesListParticipant(addParticipantReq);
      }
      this.form.reset();
      this.router.navigate(['expenses-lists']);
    } catch(error) {
      console.error(error);
    }
  }

  onCancel(): void {
    if (!this.expensesList) {
      this.goBackToList();
      return;
    }
    this.editMode = false;
    this.form.disable();
  }

  goBackToList(): void {
    this.router.navigateByUrl(`/expenses-lists`);
  }

  onEnterEditMode(): void {
    this.editMode = true;
    this.form.get('expensesList')?.enable();
  }

}
