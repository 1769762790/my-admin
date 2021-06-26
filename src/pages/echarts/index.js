import React from "react";
import { Card, Row, Col } from "antd";
import echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react";
import "./index.less";

// 设置echarts 主题色
// echarts.registerTheme('my_theme', {
//     backgroundColor: '#f4cccc'
//   });

const EchartsDemo = (props) => {
  const getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "OFO订单量",
          type: "line", //这块要定义type类型，柱形图是bar,饼图是pie
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
        },
      ],
    };
    return option;
  };
  const getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
      },
      legend: {
        data: ["OFO", "摩拜", "小蓝"],
      },
      tooltip: {
        //展示数据
        trigger: "axis",
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "OFO",
          type: "bar",
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000],
        },
        {
          name: "摩拜",
          type: "bar",
          data: [1500, 3000, 4500, 6000, 8000, 10000, 15000],
        },
        {
          name: "小蓝",
          type: "bar",
          data: [1000, 2000, 2500, 4000, 6000, 7000, 8000],
        },
      ],
    };
    return option;
  };
  const getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)", //自定义展示的tootip
      },
      series: [
        //饼图中的series没有x,y轴，所以通过series中必须有value和name
        {
          name: "订单量",
          type: "pie",
          radius: ["50%", "80%"], //控制内环、外环
          data: [
            {
              value: 1000,
              name: "周一",
            },
            {
              value: 2000,
              name: "周二",
            },
            {
              value: 1000,
              name: "周三",
            },
            {
              value: 1000,
              name: "周四",
            },
            {
              value: 1000,
              name: "周5五",
            },
            {
              value: 1000,
              name: "周六",
            },
            {
              value: 1000,
              name: "周日",
            },
          ],
        },
      ],
    };
    return option;
  };
  const getOption4 = () => {
    var data = [];

    for (var i = 0; i <= 360; i++) {
      var t = (i / 180) * Math.PI;
      var r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    let option = {
      title: {
        text: "极坐标双数值轴",
      },
      legend: {
        data: ["line"],
      },
      polar: {
        center: ["50%", "54%"],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      angleAxis: {
        type: "value",
        startAngle: 0,
      },
      radiusAxis: {
        min: 0,
      },
      series: [
        {
          coordinateSystem: "polar",
          name: "line",
          type: "line",
          showSymbol: false,
          data: data,
        },
      ],
      animationDuration: 2000,
    };
    return option;
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12} lg={24}>
        <Card title="折线图" className="echarts-item">
          <ReactEcharts option={getOption()} style={{ height: "400px" }} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={24}>
        <Card title="柱形图" className="echarts-item">
          <ReactEcharts option={getOption2()} style={{ height: "400px" }} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={24}>
        <Card title="饼形图" className="echarts-item">
          <ReactEcharts option={getOption3()} style={{ height: "400px" }} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={24}>
        <Card title="极坐标双数值轴" className="echarts-item">
          <ReactEcharts option={getOption4()} style={{ height: "400px" }} />
        </Card>
      </Col>
    </Row>
  );
};

export default EchartsDemo;
