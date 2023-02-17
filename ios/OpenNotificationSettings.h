
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNOpenNotificationSettingsSpec.h"

@interface OpenNotificationSettings : NSObject <NativeOpenNotificationSettingsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface OpenNotificationSettings : NSObject <RCTBridgeModule>
#endif

@end
