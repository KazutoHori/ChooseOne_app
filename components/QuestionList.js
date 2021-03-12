import {
  FlatList,
  RefreshControl
} from 'react-native';
import React from 'react';

import Question from './Question';


export default class QuestionList extends React.Component {

  renderItem = ({ item: { id, slug, author, title, created, choices, comments }}) => {
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
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        }
      />
    );
  }
}
