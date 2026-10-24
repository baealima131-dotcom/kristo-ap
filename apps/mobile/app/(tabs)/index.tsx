import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FeedCard } from "@/src/ui/FeedCard";
import { VIP } from "@/src/ui/vipTheme";
import { feedGetAll, feedSubscribe, type FeedItem } from "@/src/store/feedStore";

export default function FeedScreen() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
  const unsub = feedSubscribe(() => setTick((x) => x + 1));
  return () => { try { (unsub as any)?.(); } catch {} };
}, []);

  const data = useMemo(() => feedGetAll(), [tick]);
  const [activeId, setActiveId] = useState<string | null>(data[0]?.id ?? null);

  const tabH = useBottomTabBarHeight();
  // Measure the real space allocated by the navigator. Android renders the
  // tab bar in the layout; iOS keeps the existing overlay tab bar.
  const [viewportHeight, setViewportHeight] = useState(0);
  const itemH = Math.max(1, viewportHeight);
  const bottomOverlayInset = Platform.OS === "ios" ? tabH : 0;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 70 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    const top = viewableItems?.[0]?.item as FeedItem | undefined;
    if (top?.id) setActiveId(top.id);
  }).current;

  return (
    <View
      style={s.wrap}
      onLayout={(event) => {
        const height = Math.round(event.nativeEvent.layout.height);
        if (height > 0 && height !== viewportHeight) setViewportHeight(height);
      }}
    >
      {viewportHeight > 0 && (
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <FeedCard item={item} isActive={item.id === activeId} height={itemH} bottomInset={bottomOverlayInset} />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemH}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        bounces={false}
        getItemLayout={(_, index) => ({ length: itemH, offset: itemH * index, index })}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      )}
    </View>
  );
}

const s = StyleSheet.create<any>({
  wrap: { flex: 1, backgroundColor: VIP.colors.bg },
});
