import React, { Component } from "react";
import Wrapper from "../Wrapper";
import c3 from "c3";
import axios from "axios";
import { connect } from "react-redux";
import { User } from "../../classes/user";
import constants from "../../constants";

class Dashboard extends Component<{ user: User }> {
    componentDidMount = async () => {
        if (this.props.user.canView("orders")) {
            let chart = c3.generate({
                bindto: "#chart",
                data: {
                    x: "x",
                    columns: [["x"], ["Sales"]],
                    types: {
                        Sales: "bar",
                    },
                },
                axis: {
                    x: {
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d",
                        },
                    },
                },
            });

            const response = await axios.get(`${constants.BASE_URL}/chart`);

            const records: { date: string; sum: number }[] = response.data.data;

            chart.load({
                columns: [
                    ["x", ...records.map((r) => r.date)],
                    ["Sales", ...records.map((r) => r.sum)],
                ],
            });
        } else {
            return null;
        }
    };

    render() {
        let chart = null;

        if (this.props.user.canView("orders")) {
            chart = (
                <>
                    <h2>Daily Sales</h2>
                    <div id="chart" />
                </>
            );
        } else {
            chart = (
                <>
                    <h2>Dashboard</h2>
                    <p>Unauthorized access to data</p>
                </>
            );
        }

        return (
            <Wrapper>
                {chart}
            </Wrapper>
        );
    }
}

// @ts-ignore
export default connect((state) => ({ user: state.user }))(Dashboard);
