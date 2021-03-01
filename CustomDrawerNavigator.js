import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { DrawerItems } from "react-navigation-drawer";

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  icons: {
    width: 30
  }
});
