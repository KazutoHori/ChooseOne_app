import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { getImageFromId } from '../utils/api';
import Question from './Question';

const keyExtractor = ({ id }) => id.toString();

export default class QuestionList extends React.Component {

  renderItem = ({ item: { id, author, title, created, updated, choices, comments }}) => {
    const { onPress } = this.props;
    return (
      <Question
        author={author}
        id={id}
        title={title}
        created={created}
        choices={choices}
        comments={comments}
        onPress={onPress}
        // onPressLinkText={() => onPressComments(id)}
      />
    );
  };

  render() {
    const { questions  } = this.props;

    return (
      <FlatList
        data={questions}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        // extraData={commentsForItem}
      />
    );
  }
}
