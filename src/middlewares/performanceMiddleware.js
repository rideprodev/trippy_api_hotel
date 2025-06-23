import utility from "../services/utility";

const performanceMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const timings = {
    middleware: 0,
    validation: 0,
    hotelMiddleware: 0,
    controller: 0,
    total: 0
  };

  // Track middleware execution
  const originalNext = next;
  next = function() {
    timings.middleware = Date.now() - startTime;
    originalNext.apply(this, arguments);
  };

  // Override res.json to track total time
  const originalJson = res.json;
  res.json = function(body) {
    timings.total = Date.now() - startTime;
    
    // Calculate controller time (total - middleware)
    timings.controller = timings.total - timings.middleware;
    
    // Log comprehensive performance metrics
    console.log(`\n🚀 COMPREHENSIVE PERFORMANCE REPORT for ${req.method} ${req.path}`);
    console.log(`═══════════════════════════════════════════════════════════════`);
    console.log(`📊 OVERALL TIMING:`);
    console.log(`   🕐 Total Response Time: ${timings.total}ms`);
    console.log(`   🔧 Middleware Chain: ${timings.middleware}ms`);
    console.log(`   🎯 Controller Logic: ${timings.controller}ms`);
    console.log(`   📦 Response Size: ${JSON.stringify(body).length} bytes`);
    
    // Detailed middleware breakdown
    if (req.middlewareTimings) {
      console.log(`\n🔍 MIDDLEWARE BREAKDOWN:`);
      Object.entries(req.middlewareTimings).forEach(([name, time]) => {
        const percentage = ((time / timings.total) * 100).toFixed(1);
        console.log(`   - ${name}: ${time}ms (${percentage}%)`);
      });
    }
    
    // Third-party API analysis
    const thirdPartyAPIs = Object.entries(req.middlewareTimings || {})
      .filter(([name]) => name.includes('thirdPartyAPI'))
      .map(([name, time]) => ({ name, time }));
    
    if (thirdPartyAPIs.length > 0) {
      console.log(`\n🌐 THIRD-PARTY API ANALYSIS:`);
      const totalAPITime = thirdPartyAPIs.reduce((sum, api) => sum + api.time, 0);
      const avgAPITime = totalAPITime / thirdPartyAPIs.length;
      console.log(`   📊 Total API Calls: ${thirdPartyAPIs.length}`);
      console.log(`   ⏱️ Total API Time: ${totalAPITime}ms`);
      console.log(`   📈 Average API Time: ${avgAPITime.toFixed(0)}ms`);
      console.log(`   📊 API Time % of Total: ${((totalAPITime / timings.total) * 100).toFixed(1)}%`);
      
      thirdPartyAPIs.forEach((api, index) => {
        console.log(`   - API Call ${index + 1}: ${api.time}ms`);
      });
    }
    
    // Database query analysis
    const dbQueries = Object.entries(req.middlewareTimings || {})
      .filter(([name]) => name.includes('Query') || name.includes('Fetch'))
      .map(([name, time]) => ({ name, time }));
    
    if (dbQueries.length > 0) {
      console.log(`\n🗄️ DATABASE QUERY ANALYSIS:`);
      const totalDBTime = dbQueries.reduce((sum, query) => sum + query.time, 0);
      const avgDBTime = totalDBTime / dbQueries.length;
      console.log(`   📊 Total DB Queries: ${dbQueries.length}`);
      console.log(`   ⏱️ Total DB Time: ${totalDBTime}ms`);
      console.log(`   📈 Average DB Time: ${avgDBTime.toFixed(0)}ms`);
      console.log(`   📊 DB Time % of Total: ${((totalDBTime / timings.total) * 100).toFixed(1)}%`);
      
      dbQueries.forEach((query, index) => {
        console.log(`   - ${query.name}: ${query.time}ms`);
      });
    }
    
    // Data processing analysis
    const dataProcessing = Object.entries(req.middlewareTimings || {})
      .filter(([name]) => name.includes('Processing') || name.includes('Filtering') || name.includes('Combination'))
      .map(([name, time]) => ({ name, time }));
    
    if (dataProcessing.length > 0) {
      console.log(`\n⚙️ DATA PROCESSING ANALYSIS:`);
      const totalProcessingTime = dataProcessing.reduce((sum, process) => sum + process.time, 0);
      console.log(`   ⏱️ Total Processing Time: ${totalProcessingTime}ms`);
      console.log(`   📊 Processing % of Total: ${((totalProcessingTime / timings.total) * 100).toFixed(1)}%`);
      
      dataProcessing.forEach((process, index) => {
        console.log(`   - ${process.name}: ${process.time}ms`);
      });
    }
    
    // Performance warnings and recommendations
    console.log(`\n⚠️ PERFORMANCE ALERTS:`);
    let hasWarnings = false;
    
    if (timings.total > 60000) {
      console.log(`   🚨 CRITICAL: Total response time > 60s (${timings.total}ms)`);
      hasWarnings = true;
    } else if (timings.total > 30000) {
      console.log(`   ⚠️ SLOW: Total response time > 30s (${timings.total}ms)`);
      hasWarnings = true;
    }
    
    if (timings.controller > 25000) {
      console.log(`   ⚠️ SLOW: Controller time > 25s (${timings.controller}ms)`);
      hasWarnings = true;
    }
    
    if (timings.middleware > 5000) {
      console.log(`   ⚠️ SLOW: Middleware time > 5s (${timings.middleware}ms)`);
      hasWarnings = true;
    }
    
    // Check for slow database queries
    const slowDBQueries = dbQueries.filter(query => query.time > 3000);
    if (slowDBQueries.length > 0) {
      console.log(`   ⚠️ SLOW DATABASE: ${slowDBQueries.length} queries > 3s`);
      hasWarnings = true;
    }
    
    // Check for slow API calls
    const slowAPIs = thirdPartyAPIs.filter(api => api.time > 15000);
    if (slowAPIs.length > 0) {
      console.log(`   ⚠️ SLOW API: ${slowAPIs.length} calls > 15s`);
      hasWarnings = true;
    }
    
    if (!hasWarnings) {
      console.log(`   ✅ All performance metrics are within acceptable ranges`);
    }
    
    // Performance recommendations
    console.log(`\n💡 PERFORMANCE RECOMMENDATIONS:`);
    if (thirdPartyAPIs.length > 0 && (thirdPartyAPIs[0].time / timings.total) > 0.8) {
      console.log(`   🔧 Third-party API is 80%+ of total time - Consider caching`);
    }
    if (dbQueries.length > 10) {
      console.log(`   🔧 High number of DB queries (${dbQueries.length}) - Consider batching`);
    }
    if (timings.middleware > 2000) {
      console.log(`   🔧 Middleware taking >2s - Review database queries`);
    }
    
    console.log(`═══════════════════════════════════════════════════════════════\n`);
    
    originalJson.apply(this, arguments);
  };

  // Add timing methods to req for other middleware to use
  req.startTiming = (name) => {
    req[`${name}Start`] = Date.now();
  };

  req.endTiming = (name) => {
    if (req[`${name}Start`]) {
      const duration = Date.now() - req[`${name}Start`];
      
      // Store middleware timings
      if (!req.middlewareTimings) {
        req.middlewareTimings = {};
      }
      req.middlewareTimings[name] = duration;
      
      console.log(`   ⏱️ ${name}: ${duration}ms`);
      
      // Performance warnings for specific operations
      if (duration > 3000 && name.includes('Query')) {
        console.log(`   ⚠️ SLOW DATABASE: ${name} took ${duration}ms`);
      }
      if (duration > 10000 && name.includes('API')) {
        console.log(`   ⚠️ SLOW API: ${name} took ${duration}ms`);
      }
    }
  };

  next();
};

export default {
  performanceMiddleware,
}; 