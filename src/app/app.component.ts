import {Component, OnDestroy, OnInit} from "@angular/core";
import {GraphService} from "./graph.service";
import {take} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  ontologyOptions: any
  ontologyInstance: any

  graphOptions: any

  constructor(private graphService: GraphService) {}

  name = 'Angular mat-icon';
  defaultOptions: Array<any> = [];
  newOption: any = {'name': "", 'scope': "", 'value': "", 'properties': []};
  constraints: Array<any> = [];
  newConstraint: any = {'name': "", 'scope': "", 'value': "", 'property': ""};
  isEditItems: boolean | undefined;

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
   this.graphService.ontology()
    .pipe(take(1))
    .subscribe(
    (response) => {
      this.ontologyOptions = this.getOntology(response);
    },
    (error) => {
      console.error('Request failed with error', error)
    })
  }

  getOntology(response: any) {
    return {
      animationEasingUpdate: 'quinticInOut',
      title: {
        text: 'QueryBox',
        top: 'top',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
      },
      legend: [
        {
          data: response.categories.map(function (a: any) {
            return a.name
          })
        }
      ],
      graphic: [
        {
          type: 'group',
          bounding: 'all',
          right: 50 + 70,
          top: 50,
          invisible: true,
          children: [
            {
              type: 'circle',
              id: 'circle',
              left: 'center',
              top: 'center',
              silent: true,
              invisible: true,
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
              invisible: true,
              style: {
                fill: '#fff',
                text: 'text',
                textAlign: 'middle',
                font: '13px Microsoft YaHei'
              }
            },
            {
              type: 'sector',
              id: 'right_ring',
              invisible: true,
              shape: {
                r: 70,
                r0: 50,
                startAngle: -Math.PI / 2,
                endAngle: Math.PI / 2
              },
              left: '100%',
              top: 'center',
              style: {
                fill: '#F0F8FF',
              },
              onmouseover: function () {
                this.style.fill = '#76eec6'
              },
              onmouseout: function () {
                this.style.fill = '#F0F8FF'
              },
              onclick: this.hiddeController.bind(this)
            },
            {
              type: 'sector',
              id: 'left_ring',
              invisible: true,
              shape: {
                r: 70,
                r0: 50,
                startAngle: Math.PI / 2,
                endAngle: Math.PI * 1.5
              },
              right: '100%',
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
              onclick: this.hiddeController.bind(this)
            }]
        }],
      series: [
        {
          type: 'graph',
          layout: 'force',
          symbolSize: 70,
          draggable: true,
          roam: "scale",
          symbol: "circle",
          cursor: "pointer",
          selectedMode: "multiple",
          animation: true,
          force: {
            edgeLength: 200,
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
          label: {
            show: true,
            fontStyle: 'oblique',
            formatter: '{b}'
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: function (params: any) {
                return params.data.label
              }
            }
          },
          data: response.nodes.map(function (node: any) {
            return node
          }),
          links: response.links.map(function (link: any) {
            return link
          }),
          categories: response.categories.map(function (category: any) {
            return category
          })
        }
      ]
    };
  }

  getGeneratedGraph(response: any) {
    return {
      // animationEasingUpdate: 'quinticInOut',
      title: {
        text: 'Auto-Generated-Graph',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {
        trigger: 'item',
      },
      legend: [
        {
          data: response.categories.map(function (a: any) {
            return a.name
          })
        }
      ],
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
          select: {
            label: {
              show: true
            },
          },
          force: {
            edgeLength: 100,
            repulsion: 100,
            gravity: 0.01,
            friction: 0.1,
            layoutAnimation: true
          },
          itemStyle: {
            opacity: 0.8
          },
          lineStyle: {
            curveness: 0.1
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
                properties += key + ": " + params.value[key] + "\n";
              })
              return properties
            }
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: function (params: any) {
                return params.data.label
              }
            }
          },
          data: response.nodes.map(function (node: any) {
            return node
          }),
          links: response.links.map(function (link: any) {
            return link
          }),
          categories: response.categories.map(function (category: any) {
            return category
          })
        }
      ]
    };
  }

  onChartInit(ec:any) {
    this.ontologyInstance = ec;
  }

  onChartDbClick(ec: any) {
    if (ec.componentType == 'series') {
      this.ontologyOptions.graphic.invisible = false;
      this.ontologyOptions.graphic[0].children.map(function (el: any) {
        el.invisible = false;
        if (el.type == "text") {
          el.style.text = ec.name
        }
        if (el.type == "circle") {
          el.style.fill = ec.color
        }
        return el
      })
      this.ontologyInstance.setOption(this.ontologyOptions, false)
    }
    let props: Array<string> = ec.data.value.properties
    this.newOption.name = ec.data.value.name
    this.newOption.properties = props
  }

  hiddeController(event: any) {
    event.target.parent._children.forEach(function (element: any) {
      element.invisible = true;
    })
    if (event.target.id === "left_ring") {
      this.newOption.scope = "Source"
    }
    if (event.target.id === "right_ring") {
      this.newOption.scope = "Target"
    }
    this.defaultOptions.push(this.newOption);
    this.newConstraint.name = this.newOption.name
    this.newConstraint.scope = this.newOption.scope
    this.newConstraint.value = this.newOption.value
    this.constraints.push(this.newConstraint)
    this.newOption = {}
    this.newConstraint = {}
  }

  deleteFieldValue(index:any) {
    this.defaultOptions.splice(index, 1);
    this.constraints.splice(index, 1);
  }

  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
  }

  onQuery() {
    let start = this.constraints[0]
    let end = this.constraints[1]
    let startLabel = start.name || ""
    let startProp = start.property || ""
    let startValue = start.value || ""
    let endLabel = end.name || ""
    let endProp = end.property || ""
    let endValue = end.value || ""
    this.graphService.dfsPath(startLabel, startProp, startValue, endLabel, endProp, endValue)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.graphOptions = this.getGeneratedGraph(response);
        },
        (error) => {
          console.error('Request failed with error', error)
        })
  }

}
