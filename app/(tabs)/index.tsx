import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/tavern.png')}
          style={styles.tavern}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Quest Board!</ThemedText>
        
      </ThemedView>

      
      <ThemedView style={styles.stepsWrapper}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Make Your Quest</ThemedText>
          <ThemedText>
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
            </ThemedText>{' '}
            Make any Quest that you like
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Finish your Quest that you Made</ThemedText>
          <ThemedText>
            Finish the Quest you made kay wala pa ang official app na lahi mag buhat og quest
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Enjoy the App(beta)</ThemedText>
          <ThemedText>
            Quest Board is like a To Do App that allows you to make list that you want to do.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepsWrapper: {
    backgroundColor: 'brown',
    borderRadius: 10,
    padding: 7,
    marginTop: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  tavern: {
    resizeMode: 'cover',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'static',
  },
});
