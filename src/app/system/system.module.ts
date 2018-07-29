import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SharedModul } from '../shared/shead.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DrobdownDirective } from './shared/directives/drobdown.diractive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CarrencyCardComponent } from './bill-page/carrency-card/carrency-card.component';
import { BillService } from './shared/services/bill.service';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriasService } from './shared/services/categorias.service';
import { EventService } from './shared/services/event.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModul,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DrobdownDirective,
    BillCardComponent,
    CarrencyCardComponent,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryDetailComponent,
    HistoryFilterComponent
  ],
  providers: [BillService, CategoriasService, EventService]
})
export class SystemModule { }
