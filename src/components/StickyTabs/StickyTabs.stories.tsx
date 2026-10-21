import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { StickyTabs } from './StickyTabs';
import type { StickyTabsProps } from './StickyTabs.types';

const ROWS = Array.from({ length: 12 }, (_, index) => index);

const PanelBody = ({ title }: { title: string }) => (
  <View style={styles.panel}>
    {ROWS.map(row => (
      <Text key={row} style={styles.row}>
        {title} row {row + 1}
      </Text>
    ))}
  </View>
);

const Tabs = (props: Omit<StickyTabsProps, 'children'>) => (
  <View style={styles.frame}>
    <StickyTabs {...props}>
      <StickyTabs.Panel label="Care" testID="story.tabs.care">
        <PanelBody title="Care" />
      </StickyTabs.Panel>
      <StickyTabs.Panel
        label="Pet"
        testID="story.tabs.pet"
        transitionShell={<Text style={styles.row}>Loading pet…</Text>}
      >
        <PanelBody title="Pet" />
      </StickyTabs.Panel>
      <StickyTabs.Panel label="Owner" testID="story.tabs.owner" lazy>
        <PanelBody title="Owner" />
      </StickyTabs.Panel>
      {props.barMode === 'inline' ? (
        <>
          <StickyTabs.Bar />
          <ScrollView>
            <StickyTabs.Content />
          </ScrollView>
        </>
      ) : (
        <>
          <ScrollView>
            <StickyTabs.Spacer />
            <StickyTabs.Content />
          </ScrollView>
          <StickyTabs.Bar />
        </>
      )}
    </StickyTabs>
  </View>
);

const meta = {
  title: 'Components/StickyTabs',
  component: Tabs,
  args: {
    stickyBar: { top: 0, style: { left: 16, position: 'absolute', right: 16 } },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StickyOverlay: Story = {};

export const Inline: Story = { args: { barMode: 'inline' } };

export const ActiveOnlyDelayed: Story = {
  args: { contentMode: 'active-only' },
};

export const KeepMountedHidden: Story = {
  args: { contentMode: 'keep-mounted-hidden' },
};

export const DefaultSecondTab: Story = { args: { defaultSelectedIndex: 1 } };

const styles = StyleSheet.create({
  frame: { height: 480, width: 360 },
  panel: { padding: 16 },
  row: { paddingVertical: 12 },
});
