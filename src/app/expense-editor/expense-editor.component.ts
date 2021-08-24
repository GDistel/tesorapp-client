import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../expenses-list/interfaces';
import { TopNavService } from '../core/top-nav/top-nav.service';
import { CreateExpenseRequest, Participant } from '../expenses-list/interfaces';
import { ExpensesListService } from '../expenses-list/expenses-list.service';

@Component({
  templateUrl: './expense-editor.component.html',
  styleUrls: ['./expense-editor.component.scss']
})
export class ExpenseEditorComponent implements OnInit {
  form!: FormGroup;
  currencies!: string[];
  listParticipants!: Participant[];
  expensesListId!: number;
  expense!: Expense;
  editMode = true;
  loading = false;

  constructor(
    private expensesListSvc: ExpensesListService,
    private topNavSvc: TopNavService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavTitleSubject().next('Add expense');
    this.expensesListId = this.activatedRoute.snapshot.params.id;
    this.listParticipants = await this.expensesListSvc.getExpensesListParticipants(this.expensesListId);
    const expenseId = this.activatedRoute.snapshot.queryParams.expenseId;
    if (expenseId) {
      this.expense = await this.expensesListSvc.getExpense(expenseId);
      this.populateFormWithExpenseData();
      this.topNavSvc.getTopNavTitleSubject().next('Expense');
    } else {
      this.populateFormWithAvailableData();
    }
    this.topNavSvc.getTopNavBackLinkSubject().next(`/expenses-list/${this.expensesListId}`);
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      date: new FormControl(new Date(), Validators.required),
      paidBy: new FormControl(null, Validators.required),
      participantIds: new FormControl([], Validators.minLength(1))
    });
  }

  onEnterEditMode(): void {
    this.editMode = true;
    this.form.enable();
  }

  populateFormWithExpenseData(): void {
    this.form.patchValue({...this.expense});
    this.form.disable();
    this.editMode = false;
  }

  populateFormWithAvailableData(): void {
    this.form.patchValue({
      paidBy: this.listParticipants[0].id,
      participantIds: this.listParticipants.map(x => x.id)
    });
  }

  async onFormSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    if (this.expense) {
      await this.updateExpense();
      this.loading = false;
      return;
    }
    await this.createNewExpense();
    this.loading = false;
  }

  async updateExpense(): Promise<void> {
    const req: Partial<CreateExpenseRequest> = {
      expensesListId: this.expensesListId,
      ...this.form.value
    };
    this.expense = await this.expensesListSvc.updateExpense(req, this.expense.id);
    this.editMode = false;
    this.form.disable();
  }

  async createNewExpense(): Promise<void> {
    const req: CreateExpenseRequest = { ...this.form.value, expensesListId: this.expensesListId };
    try {
      await this.expensesListSvc.createExpense(req);
      this.form.reset();
      this.goBackToList();
    } catch(error) {
      console.error(error);
    }
  }

  onCancel(): void {
    if (!this.expense) {
      this.goBackToList();
      return;
    }
    this.editMode = false;
    this.form.disable();
  }

  goBackToList(): void {
    this.router.navigateByUrl(`/expenses-list/${this.expensesListId}`);
  }

}
