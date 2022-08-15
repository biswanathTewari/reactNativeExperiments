#import "MyLoggerModule.h"
#import <React/RCTLog.h>

@implementation RCTMyLoggerModule

RCT_EXPORT_MODULE(MyLogger)

RCT_EXPORT_METHOD(myEventLog: (NSString*)msg EventType: (NSString*)eventType ){
  RCTLogInfo(@"The msg is %@ and the event is %@", msg, eventType);
}

@end
