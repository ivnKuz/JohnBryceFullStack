import { Component } from "react";
import "./Clock.css";

interface ClockProps {
	format: string;
}

interface ClockState {
	time: string;
}

class Clock extends Component<ClockProps, ClockState> {
    private timerId: number = 0;
    public constructor(props: ClockProps) {
        super(props);
        this.state = {
			time: 'initial time'
        };
    }

    public componentDidMount(): void {
        // alert('clock component created')
         this.timerId = window.setInterval(()=>{
            const now = new Date();
            const isTwelveHourDisplay: boolean = this.props.format === '12h';
            const time = now.toLocaleTimeString('en-US', {
                hour12: isTwelveHourDisplay
            });
            this.setState({time: time});
        }, 1000)
    }
    public componentWillUnmount(): void {
        clearInterval(this.timerId);
    }
    public displayTime(){
        const now = new Date();

    }
    public render(): JSX.Element {
        return (
            <div className="Clock">
				<p>time is {this.state.time}</p>
            </div>
        );
    }
}

export default Clock;
