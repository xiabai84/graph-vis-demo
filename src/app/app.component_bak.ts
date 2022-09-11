// import { Component, OnInit } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
//
// @Component({
//   selector: "app-root",
//   templateUrl: "./app.component.html",
//   styleUrls: ["./app.component.css"]
// })
// export class AppComponent implements OnInit {
//   options: any;
//   constructor(private http: HttpClient) {}
//
//   ngOnInit(): void {
//     let data = [
//       {
//         name: "karan",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#000" }
//       },
//
//       {
//         name: "max",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#45128C" }
//       },
//       {
//         name: "1800",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#45128C" }
//       },
//       {
//         name: "manish",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#45128C" }
//       },
//       {
//         name: "alan",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#45128C" }
//       },
//       {
//         name: "amy",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#45128C" }
//       },
//       {
//         name: "robert",
//
//         label: {
//           normal: {
//             show: true
//           }
//         },
//         itemStyle: { color: "#d0d0d0" }
//       }
//     ];
//     this.options = {
//       title: {
//         text: "Connections"
//       },
//       tooltip: {},
//       animationDurationUpdate: 3000,
//       animationEasingUpdate: "quinticInOut",
//       draggable: true,
//
//       series: [
//         {
//           type: "graph",
//           chartDataZoom: true,
//           layout: "force",
//           symbolSize: 20,
//           roam: true,
//           label: {
//             position: "left"
//           },
//           draggable: true,
//           force: {
//             repulsion: 2000,
//             gravity: 0.2
//           },
//           animation: true,
//           edgeSymbol: ["circle", "arrow"],
//           edgeSymbolSize: [4, 10],
//           edgeLabel: {
//             normal: {
//               textStyle: {
//                 fontSize: 20
//               }
//             }
//           },
//           data: data,
//           // links: [],
//           links: [
//             {
//               source: "karan",
//               target: "max",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//             {
//               source: "max",
//               target: "robert",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//             {
//               source: "karan",
//               target: "manish",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//             {
//               source: "manish",
//               target: "alan",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//             {
//               source: "alan",
//               target: "robert",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//
//             {
//               source: "karan",
//               target: "manish",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//             {
//               source: "manish",
//               target: "amy",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             },
//             {
//               source: "amy",
//               target: "robert",
//               lineStyle: {
//                 color: "#A063EB"
//               }
//             }
//           ],
//           lineStyle: {
//             normal: {
//               opacity: 0.9,
//               width: 2,
//               curveness: 0
//             }
//           }
//         }
//       ]
//     };
//   }
// }
