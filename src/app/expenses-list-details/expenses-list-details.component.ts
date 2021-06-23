import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopNavService } from '../core/top-nav/top-nav.service';
import { ExpensesListService } from '../expenses-list/expenses-list.service';
import { ExpensesListResolution } from '../expenses-list/interfaces';
import { ExpensesListsService } from '../expenses-lists/expenses-lists.service';
import { ExpensesList } from '../expenses-lists/interfaces';

@Component({
  selector: 'app-expenses-list-details',
  templateUrl: './expenses-list-details.component.html',
  styleUrls: ['./expenses-list-details.component.scss']
})
export class ExpensesListDetailsComponent implements OnInit {
  expensesList!: ExpensesList;
  listResolution!: ExpensesListResolution | null;

  constructor(
    private topNavSvc: TopNavService,
    private route: ActivatedRoute,
    private router: Router,
    private expensesListsSvc: ExpensesListsService,
    private expensesListSvc: ExpensesListService
  ) { }

  async ngOnInit(): Promise<void> {
    this.topNavSvc.getTopNavTitleSubject().next('Expenses list details');
    const listId = this.route.snapshot.params.id;
    this.topNavSvc.getTopNavBackLinkSubject().next(`/expenses-list/${listId}`);
    this.expensesList = await this.expensesListsSvc.getExpensesList(listId);
    try {
      this.listResolution = await this.expensesListSvc.getExpensesListResolution(listId);
    } catch(err) {
      this.listResolution = null;
    }
  }

  getReceiver(id: string): string | undefined {
    const participant = this.expensesList.participants?.find(x => x.id === +id);
    return participant?.name;
  }

  onEditExpensesList(): void {
    this.router.navigate(['expenses-list-editor'], { queryParams: { expensesListId: this.expensesList.id } });
  }

}
