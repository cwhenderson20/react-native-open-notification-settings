#import "OpenNotificationSettings.h"

@implementation OpenNotificationSettings {
  bool hasListeners;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
  return @[@"settings_for_notification_opened"];
}

+ (instancetype)sharedInstance {
  static OpenNotificationSettings *sharedInstance = nil;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    sharedInstance = [[OpenNotificationSettings alloc] init];
    sharedInstance.didOpenSettingsForNotification = NO;
  });

  return sharedInstance;
}

+ (id)allocWithZone:(NSZone *)zone {
    static OpenNotificationSettings *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });

    return sharedInstance;
}

- (void)startObserving {
  hasListeners = YES;
}

- (void)stopObserving {
  hasListeners = NO;
}

-(NSNumber *)getDidOpenSettingsForNotification {
  if (_didOpenSettingsForNotification != NO) {
    _didOpenSettingsForNotification = NO;
    return @YES;
  }
  
  return @NO;
}

- (void)openSettingsForNotification {
  _didOpenSettingsForNotification = YES;
  
  if (hasListeners) {
    [self sendEventWithName:@"settings_for_notification_opened" body:@{}];
  }
}

RCT_EXPORT_METHOD(getDidOpenSettingsForNotification
                  : (RCTPromiseResolveBlock)resolve
                  : (RCTPromiseRejectBlock)reject) {
  resolve([self getDidOpenSettingsForNotification]);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeOpenNotificationSettingsSpecJSI>(params);
}
#endif

@end
