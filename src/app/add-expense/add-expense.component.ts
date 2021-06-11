import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TopNavService } from '../core/top-nav/top-nav.service';
import { CreateExpenseRequest, Participant } from '../expenses-list/interfaces';
import { ExpensesListService } from '../expenses-list/expenses-list.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  form!: FormGroup;
  currencies!: string[];
  listParticipants!: Participant[];
  expensesListId!: number;

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
    this.topNavSvc.getTopNavBackLinkSubject().next(`/expenses-list/${this.expensesListId}`);
    this.listParticipants = await this.expensesListSvc.getExpensesListParticipants(this.expensesListId);
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      date: new FormControl(new Date(), Validators.required),
      paidBy: new FormControl(null),
      participantIds: new FormControl([], Validators.minLength(1))
    })
  }

  async onFormSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    const req: CreateExpenseRequest = { ...this.form.value, expensesListId: this.expensesListId };
    try {
      await this.expensesListSvc.createExpense(req);
      this.form.reset();
      this.goBackToList();
    } catch(error) {
      console.error(error);
    }
  }

  goBackToList(): void {
    this.router.navigateByUrl(`/expenses-list/${this.expensesListId}`);
  }

}
