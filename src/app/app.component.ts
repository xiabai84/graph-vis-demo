import {Component, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {GraphService} from "./graph.service";
import { DOCUMENT } from '@angular/common';
import {EChartsOption} from "echarts";
import {take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NgxEchartsDirective} from "ngx-echarts";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  options: any
  clickEvent: any

  // @ViewChild("graph")
  // graphElem: NgxEchartsDirective

  fixedChart: any

  constructor(private graphService: GraphService, @Inject(DOCUMENT) document: Document) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.graphService.shortestPath("", "","","","","")
      .pipe(take(1))
      .subscribe(
      (response) => {
        console.log("response", response)
        this.options = {
          animationEasingUpdate: 'quinticInOut',
          title: {
            text: 'Graph-Demo',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {
            trigger: 'item',
          },
          legend: [
            {
              data: response.categories.map(function (a: any) {
                return a.name;
              })
            }
          ],
          graphic: [
            {
              type: 'group',
              bounding: 'all',
              right: 50 + 70,
              top: 50,
              invisible: false,
              children: [
                {
                  type: 'circle',
                  id: 'circle',
                  left: 'center',
                  top: 'center',
                  silent: true,
                  invisible: false,
                  shape: {
                    r: 50
                  },
                  style: {
                    fill: 'rgba(0,0,0,0.3)'
                  }
                },
                {
                  type: 'text',
                  id: 'text',
                  right: 'center',
                  top: 'center',
                  silent: true,
                  invisible: false,
                  style: {
                    fill: '#fff',
                    text: 'test',
                    textAlign: 'middle',
                    font: '13px Microsoft YaHei'
                  }
                },
                {
                  type: 'sector',
                  id: 'right_ring',
                  invisible: false,
                  shape: {
                    r: 70,
                    r0: 50,
                    startAngle: -Math.PI / 2,
                    endAngle: Math.PI / 2
                  },
                  left: '100%',
                  top: 'center',
                  style: {
                    fill: '#F0F8FF'
                  },
                  onmouseover: function () {
                    console.log('this: ', this);
                    this.style.fill = '#76eec6' // "this" ist hier irgendwas innerhalb der echart-lib
                  },
                  onmouseout: function () {
                    this.style.fill = '#F0F8FF'
                  },
                  onclick: this.onClick.bind(this)
                  // onclick: function () {
                  //   // @ts-ignore
                  //   this.parent._children.map(function (element: any) {
                  //     element.invisible = true;
                  //     return element
                  //   })
                  // }
                },
                {
                  type: 'sector',
                  id: 'left_ring',
                  invisible: false,
                  shape: {
                    r: 70,
                    r0: 50,
                    startAngle: Math.PI / 2,
                    endAngle: Math.PI * 1.5
                  },
                  right: '50%',
                  top: 'center',
                  style: {
                    fill: '#F0F8FF'
                  },
                  onmouseover: function () {
                    this.style.fill = '#76eec6'
                  },
                  onmouseout: function () {
                    this.style.fill = '#F0F8FF'
                  },
                  onclick: function () {
                    // @ts-ignore
                    this.parent._children.map(function (element: any) {
                      element.invisible = true;
                      return element
                    })
                  }
                }]
            }],
          series: [
            {
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
                },
              },
              force: {
                edgeLength: 100,
                repulsion: 100,
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
              emphasis: {
                focus: 'self'
              },
              labelLayout: function () {
                return {
                  draggable: true,
                  y: '10%',
                  moveOverlap: 'shiftY'
                };
              },
              label: {
                position: 'right',
                distance: 10,
                fontStyle: 'oblique',
                backgroundColor: 'inherit',
                formatter: function (params: any) {
                  let properties = ""
                  Object.keys(params.value).forEach(function (key) {
                    // @ts-ignore
                    properties += key + ": " + params.value[key] + "\n";
                  })
                  return properties
                }
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
      (error) => {
        console.error('Request failed with error', error)
      })
  }

  onChartDbClick(ec: any) {
    console.log("double-click:", ec)
    this.clickEvent = ec
  }

  onChartClick(ec: any) {
    if (ec.componentType == 'series') {
      console.log("single-click", ec)
      this.options.graphic.invisible = false;
    }
  }

  onClick(event: MouseEvent|null = null) {
    console.log('event: ', event);
    this.options.graphic[0].children[2].onmouseover() // achtung, damit is in zeile 108 das "this" ein pointer auf AppComponent Instanz, statt
  }
}
