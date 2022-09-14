import {Component, OnInit} from "@angular/core";
import {EChartsOption} from "echarts";
import {GraphService} from "./graph.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // graph = jsondata
  options: any

  constructor(private graphService: GraphService) {
    this.graphService.shortestPath("", "","","","","").subscribe(
      (response) => {
        console.log('response received')
        this.options = {
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
              data: response.categories.map(function (a: any) {
                return a.name;
              })
            }
          ],
          series: [
            {
              name: 'Graph-Demo',
              type: 'graph',
              layout: 'force',
              symbolSize: 30,
              draggable: true,
              roam: "scale",
              symbol: "circle",
              cursor: "pointer",
              selectedMode: "multiple",
              animation: true,
              select: {
                label: {
                  show: true
                }
              },
              force: {
                edgeLength: 100,
                repulsion: 400,
                gravity: 0.01,
                friction: 0.5,
                layoutAnimation: true
              },
              itemStyle: {
                opacity: 0.8
              },
              lineStyle: {
                curveness: 0.1
              },
              label: {
                // normal: {
                //   position: 'right',
                //   show: true
                // },
                position: 'right',
                distance: 10,
                formatter: function(params: { value: any[]; }){
                  let properties = ""
                  Object.keys(params.value).forEach(function(key) {
                    // @ts-ignore
                    properties += key + ": " + params.value[key] + "\n";
                  })
                  return properties
                } // also support "rich-test"
              },
              data: response.nodes.map(function (node: any) {
                return node
              }),
              links: response.links.map(function (links: any) {
                return links
              }),
              categories: response.categories.map(function (category: any) {
                return category
              })
            }
          ]
        };
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      },
      () => {                                   //complete() callback
        console.info('Request completed')      //This is actually not needed
      })
  }
  // ngOnInit(): void {
  //   // this.graph.nodes.forEach(function (node: any) {
  //   //   node.symbolSize = 5;
  //   // });
  // }

}
