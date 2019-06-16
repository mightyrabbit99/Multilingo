import * as React from "react";
import { Icon, Grid } from "semantic-ui-react";

export type ControlBarLocation = "Main" | "CardList";

export type ControlBarProps = {
  location: ControlBarLocation;
  color: string;
};

export const defaultControlBarProps: ControlBarProps = {
  location: "Main",
  color: "blue"
};

const ControlBar: React.SFC<ControlBarProps> = props => {
    return props.location === "Main" 
    ? (
      <Icon
        onClick={this.handleClick}
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          borderRadius: "50%",
          color: "green"
        }}
        name="plus circle"
        size="huge"
        link
      />
    ) 
    : props.location === "CardList" 
      ? (
        <Grid
          className="buttonArray"
          size="large"
        >
          <Grid.Column className='controlbutton' key='1'>
            <Icon
              onClick={this.handleClick}
              style={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                borderRadius: "50%",
                color: "green"
              }}
              name="plus circle"
              size="huge"
              link
            />
          </Grid.Column>
          <Grid.Column className='controlbutton' key='2'>
            <Icon
              onClick={this.handleClick}
              style={{
                position: "absolute",
                bottom: "5%",
                right: "5%",
                borderRadius: "50%",
                color: "green"
              }}
              name="plus circle"
              size="huge"
              link
            />
          </Grid.Column>
        </Grid>
      ) 
      : null;
};

export default ControlBar;
