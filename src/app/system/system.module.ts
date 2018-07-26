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
    CarrencyCardComponent
  ],
  providers: [BillService]
})
export class SystemModule { }
