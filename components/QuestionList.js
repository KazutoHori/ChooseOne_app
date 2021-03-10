import { FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { getImageFromId } from '../utils/api';
import Question from './Question';

// const keyExtractor = ({ id }) => id.toString();

export default class QuestionList extends React.Component {

  renderItem = ({ item: { id, slug, author, title, created, updated, choices, comments }}) => {
    const { onPress } = this.props;
    return (
      <Question
        author={author}
        id={id}
        slug={slug}
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
    const { questions, passRef, onRefresh, refreshing  } = this.props;

    return (
      <FlatList
        data={questions}
        ref={passRef}
        renderItem={this.renderItem}
        keyExtractor={({ slug }) => slug}
        // keyExtractor={keyExtractor}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        }
        // extraData={commentsForItem}
      />
    );
  }
}
