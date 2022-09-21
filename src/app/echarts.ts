// const echartsOptions: any = {
//   animationEasingUpdate : 'quinticInOut',
//   title: {
//     text: 'Graph-Demo',
//     top: 'bottom',
//     left: 'right'
//   },
//   tooltip: {
//     trigger: 'item',
//   },
//   legend: [
//     {
//       data: response.categories.map(function (a: any) {
//         return a.name;
//       })
//     }
//   ],
//   series: [
//     {
//       type: 'graph',
//       layout: 'force',
//       symbolSize: 30,
//       draggable: true,
//       roam: "scale",
//       symbol: "circle",
//       cursor: "pointer",
//       selectedMode: "multiple",
//       animation: true,
//       select: {
//         label: {
//           show: true
//         },
//       },
//       force: {
//         edgeLength: 100,
//         repulsion: 100,
//         gravity: 0.01,
//         friction: 0.5,
//         layoutAnimation: true
//       },
//       itemStyle: {
//         opacity: 0.8
//       },
//       lineStyle: {
//         curveness: 0.1
//       },
//       emphasis: {
//         focus: 'self'
//       },
//       labelLayout: function () {
//         return {
//           draggable: true,
//           y: '10%',
//           moveOverlap: 'shiftY'
//         };
//       },
//       label: {
//         position: 'right',
//         distance: 10,
//         fontStyle: 'oblique',
//         backgroundColor: 'inherit',
//         formatter: function(params: { value: any[]; }){
//           let properties = ""
//           Object.keys(params.value).forEach(function(key) {
//             // @ts-ignore
//             properties += key + ": " + params.value[key] + "\n";
//           })
//           return properties
//         }
//       },
//       data: response.nodes.map(function (node: any) {
//         return node
//       }),
//       links: response.links.map(function (links: any) {
//         return links
//       }),
//       categories: response.categories.map(function (category: any) {
//         return category
//       })
//     }
//   ]
// };
// export { echartsOptions };
