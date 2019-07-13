import React, { PureComponent } from "react";
import { Add, Close } from "grommet-icons";
import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";
import { connect } from 'react-redux';
import { setListsData, setShowAlertStatus } from '../../store/Actions';
import apiPost from '../../api/apiPost';
import apiGet from '../../api/apiGet';

const mapStateToProps = (state) => {
  const {
    user, projects, lists, selectedProjectId,
  } = state;
  return {
    user, projects, lists, selectedProjectId,
  };
};

class AddCategory extends PureComponent {
  constructor(props) {
    super(props);
    this.postCategory = this.postCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      open: false,
      title: ''
    };
  }
  
  getCategories = async () => {
    const { dispatch, user } = this.props;
    const response = await apiGet(user.jwt, 'categories');
    console.log(response)
    if (response.status === 200 && response.data.length > 0) {
      dispatch(setListsData(response.data));
    } else {
      dispatch(setShowAlertStatus({
        title: 'Error',
        text: 'A problem occured while fetching the lists',
        show: true,
        variant: 'status-error',
      }));
    }
  }

  postCategory = async (event) => {
    event.preventDefault();
    console.log(this.state)
    const { dispatch, user } = this.props;
    const { title } = this.state;
    const data = { title, users_id: user.userid };
    const res = await apiPost(user.jwt, 'categories', data);
    console.log(res)
    if (res.status === 200) {
      this.getCategories();
      dispatch(setShowAlertStatus({
        title: 'Success',
        text: 'New Category created',
        show: true,
        variant: 'status-ok',
      }));
    }
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => {
    this.setState({ open: undefined });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { open } = this.state;
    return (
        <Box margin="none">
          <Box align="end" margin="xsmall">
            <Button
              plain
              style={{borderRadius:"0", color:"#F8F8F8", padding: "5px"}}
              icon={<Add/>}
              label="Add a Category"
              hoverIndicator="neutral-2"
              focusIndicator={false}
              primary
              onClick={this.onOpen}
            />
          </Box>
          {open && (
            <Layer
              position="right"
              full="vertical"
              modal
              onClickOutside={this.onClose}
              onEsc={this.onClose}
            >
              <Box
                as="form"
                fill="vertical"
                overflow="auto"
                width="medium"
                pad="medium"
                onSubmit={this.postCategory}
              >
                <Box flex={false} direction="row" justify="between" onSubmit={this.checkLogin}>
                  <Heading level={2} margin="none">
                    Add a Category
                  </Heading>
                  <Button icon={<Close />} onClick={this.onClose} />
                </Box>
                <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <FormField label="Category Name">
                    <TextInput type="text" name="title" onChange={this.handleChange}/>
                  </FormField>
                  <Button
                    type="submit"
                    label="Submit"
                    margin={{"top": "medium"}}
                    hoverIndicator="neutral-2"
                    style={{borderRadius:"0", color:"#F8F8F8",background:"brand", padding: "5px", boxShadow: "none", border: "0 none"}}
                    primary
                  />
                </Box>
                <Box flex={false} as="footer" align="start">
                  
                </Box>
              </Box>
            </Layer>
          )}
        </Box>
    );
  }
}

export default connect(mapStateToProps)(AddCategory);

