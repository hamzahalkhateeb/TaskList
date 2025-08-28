import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  //the following are the filter options which will be used to sort the tasks list
  priorityOptions: 'lowToHigh' | 'highToLow' = 'highToLow';
  customeStartDate?: Date;
  customeEndDate?: Date;

  //when ffilters are changed, give an output to parent component!
  @Output() filterChanged = new EventEmitter<any>();

  //object to be given to parent component!
  updateFilters() {
    const filters ={
      priorityOptions: this.priorityOptions,
      startDate: this.customeStartDate,
      endDate: this.customeEndDate
    };
    this.filterChanged.emit(filters);
    console.log("emitted data", filters);
  }

}
