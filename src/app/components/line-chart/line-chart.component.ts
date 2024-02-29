import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  chart: any = [];
  labels: any = [];
  dataset: any = [];

  constructor(private chartService: ChartService) {}
  ngOnInit(): void {
    this.chartService.coinsData().subscribe({
      next: (value) => {
        let result = value.data;
        if (result?.coins?.length > 0) {
          this.dataset = result.coins.map((coins: any) => coins.price);
          this.labels = result.coins.map((coins: any) => coins.name);
          this.initializeChart();
        } else {
          this.initializeChart();
        }
      },
      error: (err) => {
        this.initializeChart();
      },
    });
  }

  initializeChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Coin Market Price',
            data: this.dataset,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
