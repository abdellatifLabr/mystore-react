import React, { Component } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import storeProvider from '../providers/store.provider';

class Analytics extends Component {
  state = {
    analytics: null,
    analyticsId: null
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ analytics: null });

    let analyticsId = e.target.value;
    this.setState({ analyticsId });

    storeProvider.getAnalytics(analyticsId)
      .then(analytics => {
        if (analytics) {
          this.setState({ analytics });
        }
      });
  }

  componentDidMount() {
    let analyticsId = this.props.stores[0].analytics.id;
    this.setState({ analyticsId });

    storeProvider.getAnalytics(analyticsId)
      .then(analytics => {
        if (analytics) {
          this.setState({ analytics });
        }
      });
  }

  render() {
    if (!this.state.analytics) {
      return (
        <h4 className="text-secondary text-center">
          <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon>
        </h4>
      );
    }

    let monthlyRevenueChartData = JSON.parse(this.state.analytics.monthlyRevenueChartData);
    let barData = {
      labels: monthlyRevenueChartData.labels,
      datasets: [
        {
          label: 'Monthly Revenue',
          data: monthlyRevenueChartData.data,
          backgroundColor: ['rgba(255, 99, 132, 0.2)']
        }
      ]
    };
    let barOptions = {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Months'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Revenue ($)'
          }
        }]
      }   
    }

    let monthlyVisitsChartData = JSON.parse(this.state.analytics.monthlyVisitsChartData);
    let lineData = {
      labels: monthlyVisitsChartData.labels,
      datasets: [
        {
          label: 'Monthly Visits',
          data: monthlyVisitsChartData.data,
          backgroundColor: ['rgba(153, 102, 255, 1)']
        }
      ]
    };
    let lineOptions = {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Months'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Visits'
          }
        }]
      }   
    }

    return (
      <>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control as="select" custom onChange={this.handleChange} value={this.state.analyticsId}>
            {this.props.stores.map((store, index) => (
              <option key={index} value={store.analytics.id}>{store.name}</option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body className="text-center">
              <small>TOTAL REVENUE</small>
              <h2 className="mb-0">{this.state.analytics.totalRevenue}</h2>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body className="text-center">
              <small>AVERAGE ORDER TOTAL</small>
              <h2 className="mb-0">{this.state.analytics.averageOrderTotal}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <small>TOTAL VISITS</small>
              <h2 className="mb-0">{this.state.analytics.totalVisits}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Line data={lineData} options={lineOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
    );
  }
}

export default Analytics;