import React, { Component, PropsWithRef } from 'react'
import Wrapper from '../Wrapper'
import axios from 'axios'
import { withRouter } from '../users/UserEdit';
import { Order } from '../../classes/order';
import { OrderItem } from '../../classes/order_item';

class OrderItems extends Component<PropsWithRef<any>> {
    state = {
        order_items: []
    }
    id = 0;

    componentDidMount = async () => {
        this.id = this.props.match.params.id;

        const response = await axios.get(`orders/${this.id}`);

        const order: Order = response.data.data;

        this.setState({
            order_items: order.order_items
        })
    }
  render() {
    return (
      <Wrapper>
        <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.order_items.map((item: OrderItem) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.product_title}</td>
                                        <td>$ {item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
      </Wrapper>
    )
  }
}

export default withRouter(OrderItems);
