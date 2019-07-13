import React, { PureComponent } from "react";
import { Box, Button, Layer, Text } from 'grommet';
import { FormClose, StatusGood } from "grommet-icons";
import { connect } from 'react-redux';
import { setShowAlertStatus } from '../store/Actions';

const mapStateToProps = (state) => {
  const { showAlertStatus } = state;
  return { showAlertStatus };
};

class Notification extends PureComponent {
  state = {
    open: false
  };

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: undefined });

  dismissAlert = () => {
    const { dispatch } = this.props;
    setTimeout(() => {
      dispatch(setShowAlertStatus({
        title: '',
        text: '',
        show: false,
        variant: '',
      }));
    }, 5000);
  }

  render() {
    const { showAlertStatus } = this.props;
    this.dismissAlert();
    return (
        <Layer
          position="bottom"
          modal={false}
          margin={{ vertical: "medium", horizontal: "small" }}
          onEsc={this.onClose}
          responsive={false}
          plain
        >
          <Box
            align="center"
            direction="row"
            gap="small"
            justify="between"
            round="medium"
            elevation="medium"
            pad={{ vertical: "xsmall", horizontal: "small" }}
            background={showAlertStatus.variant}
          >
            <Box align="center" direction="row" gap="xsmall">
              <StatusGood />
              <Text>{showAlertStatus.title}: {showAlertStatus.text}</Text>
            </Box>
            <Button icon={<FormClose />} onClick={this.onClose} plain />
          </Box>
        </Layer>
      
    )
  }
}

export default connect(mapStateToProps)(Notification);
