import { AddExpensesListParticipantRequest, CreateExpensesListRequest } from './../expenses-lists/interfaces';
import { ExpensesListsService } from './../expenses-lists/expenses-lists.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TopNavService } from '../core/top-nav/top-nav.service';
import { Currencies } from '../expenses-lists/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expenses-list',
  templateUrl: './add-expenses-list.component.html',
  styleUrls: ['./add-expenses-list.component.scss']
})
export class AddExpensesListComponent implements OnInit {
  form!: FormGroup;
  currencies!: string[];

  constructor(
    private expensesListsSvc: ExpensesListsService,
    private topNavSvc: TopNavService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.topNavSvc.getTopNavBackLinkSubject().next('/expenses-lists');
    this.topNavSvc.getTopNavTitleSubject().next('Add Expenses List');
    this.currencies = Object.values(Currencies).filter(x => isNaN(+x)); // convert enum to array of values
    this.createForm();
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

}
