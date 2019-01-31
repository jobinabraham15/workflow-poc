import * as React from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
const socketConnection = socketIOClient("http://localhost:3000/");

export default class ChatComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      count: 0,
      workflow: null
    };
  }
  componentDidMount() {
    // axios.get("http://localhost:3000/get_chatters").then(res => {
    //   console.log("res", res);
    //   this.setState({
    //     count: res.length
    //   });
    // });
  }

  startWorkFlow = () => {
    socketConnection.emit(
      "workflow",
      {
        workflow_name: "schedule_slot_new"
      },
      worklow_step => {
        socketConnection.on(worklow_step, data => {
          console.log("data in workflowStep", data);
          var parser = new DOMParser();
          this.setState({
            workflow: (parser.parseFromString(data, "text/xml").documentElement)
          });
        });
      }
    );
  };

  updateUsernameValue = value => {
    console.log("value", value);
    this.setState({
      username: value
    });
  };
  render() {
      console.log("this.state.workflow", this.state.workflow);
    return (
      <>
        <div>
          <h1>Join Chat</h1>
          <button onClick={this.startWorkFlow}>Start Workflow</button>
          <div
            ref={nodeElement => {
                this.state.workflow && nodeElement && nodeElement.appendChild(this.state.workflow);
            }}
          />
        </div>
      </>
    );
  }
}
