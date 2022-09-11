import { Component, OnInit } from "@angular/core";
import {EChartsOption} from "echarts";
import {jsondata} from "./data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  graph = jsondata

  options: EChartsOption = {
    title: {
      text: 'Graph-Demo',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: this.graph.categories.map(function (a: any) {
          return a.name;
        })
      }
    ],
    series: [
      {
        name: 'Graph-Demo',
        type: 'graph',
        layout: 'force',
        draggable: true,
        roam: "scale",
        symbol: "circle",
        cursor: "pointer",
        selectedMode: "multiple",
        select: {
          label: {
            show: true
          }
        },
        force: {
          layoutAnimation: true,
          gravity: 0.05,
          repulsion: 100,
          edgeLength: [10, 50],
          friction: 0.5
        },
        itemStyle: {
          opacity: 0.8
        },
        lineStyle: {
          curveness: 0.1
        },
        label: {
          // show: true,
          position: 'right',
          distance: 5,
          formatter: function(params){
            // @ts-ignore
            let col1 = params.value[0]
            // @ts-ignore
            let col2 = params.value[1]
            return "- " + col1 + "\n" + "- " +col2
          } // also support "rich-test"
        },
        data: this.graph.nodes.map(function (node: any) {
          return node
        }),
        links: this.graph.links.map(function (links: any) {
          return links
        }),
        categories: this.graph.categories.map(function (category: any) {
          return category
        })
      }
    ]
  };

  ngOnInit(): void {
    this.graph.nodes.forEach(function (node: any) {
      node.symbolSize = 5;
    });
  }

}
