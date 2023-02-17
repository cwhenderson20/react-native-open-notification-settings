
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOpenNotificationSettingsSpec.h"

@interface OpenNotificationSettings : RCTEventEmitter <NativeOpenNotificationSettingsSpec>
#else
#import <React/RCTEventEmitter.h>

@interface OpenNotificationSettings : RCTEventEmitter <RCTBridgeModule>
#endif

@property BOOL didOpenSettingsForNotification;

+ (instancetype)sharedInstance;
- (void)openSettingsForNotification;

@end
