import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export enum TeamPlan {
  FREE = '1',
  UNLIMITED = '2',
  BUSINESS = '3',
  ENTERPRISE = '4',
}

export enum ServiceStatus {
  Trial = 0,
  Suspended = 4,
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('interval', [
      state(
        'yearly',
        style({
          opacity: '1',
        })
      ),
      state(
        'monthly',
        style({
          opacity: '1',
        })
      ),
      transition('* <=> *', [
        style({
          opacity: '0',
        }),
        animate(200),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  serviceTrial = ServiceStatus.Trial;
  serviceSuspended = ServiceStatus.Suspended;
  freePlan = TeamPlan.FREE;
  unlimitedPlan = TeamPlan.UNLIMITED;
  businessPlan = TeamPlan.BUSINESS;
  enterprisePlan = TeamPlan.ENTERPRISE;

  @Input() ppu: string;
  @Input() currencySymbol: string;
  @Input() modifier: string;
  @Input() onPaidPlan: boolean;
  @Input() downgrading: boolean;
  @Input() storage: number;
  @Input() planId: TeamPlan;
  @Input() totalStorage: string;
  @Input() interval: string;
  @Input() serviceStatus: ServiceStatus;
  @Input() enterpriseLocalPrice: number;
  @Input() unlimitedLocalPrice: number;
  @Input() businessLocalPrice: number;
  @Input() unlimitedGuestsPerSeat: number;
  @Input() unlimitedGuestsBase: number;
  @Input() businessGuestsPerSeat: number;
  @Input() businessGuestsBase: number;
  @Input() isTrial: boolean;
  @Input() overLimit: boolean;

  @Output() onDowngradePlan = new EventEmitter<TeamPlan>();
  @Output() onTogglePaymentInterval = new EventEmitter<any>();
  @Output() onStepTwo = new EventEmitter<string>();
  @Output() onStartDowngrade = new EventEmitter<string>();

  downgradePlan(id: TeamPlan) {
    this.onDowngradePlan.emit(id);
  }

  togglePaymentInterval() {
    this.onTogglePaymentInterval.emit();
  }

  goToStepTwo(planName: string) {
    this.onStepTwo.emit(planName);
  }

  startDowngrade() {
    this.onStartDowngrade.emit();
  }
}
