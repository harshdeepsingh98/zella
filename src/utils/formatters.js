// Format mobile number
export const formatMobileNumber = (mobileNumber) => {
    if (!mobileNumber) return '';
    
    // Check if it's a string
    if (typeof mobileNumber !== 'string') {
      mobileNumber = String(mobileNumber);
    }
    
    // Remove any spaces or special characters
    mobileNumber = mobileNumber.replace(/\s+/g, '');
    
    // Format: +91 98765 43210
    if (mobileNumber.length === 10) {
      return `+91 ${mobileNumber.substring(0, 5)} ${mobileNumber.substring(5)}`;
    }
    
    return `+91 ${mobileNumber}`;
  };
  
  // Format time from seconds to MM:SS
  export const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return '00:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Format ISO duration string (PT60S) to seconds
  export const formatDuration = (isoDuration) => {
    if (!isoDuration) return 0;
    
    // Handle PT60S format (60 seconds)
    const secondsMatch = isoDuration.match(/PT(\d+)S/);
    if (secondsMatch && secondsMatch[1]) {
      return parseInt(secondsMatch[1], 10);
    }
    
    // Handle PT1M format (1 minute)
    const minutesMatch = isoDuration.match(/PT(\d+)M/);
    if (minutesMatch && minutesMatch[1]) {
      return parseInt(minutesMatch[1], 10) * 60;
    }
    
    // Handle PT1H format (1 hour)
    const hoursMatch = isoDuration.match(/PT(\d+)H/);
    if (hoursMatch && hoursMatch[1]) {
      return parseInt(hoursMatch[1], 10) * 60 * 60;
    }
    
    return 0;
  };
  
  // Format template strings with variables
  export const formatTemplate = (template, variables) => {
    if (!template) return '';
    if (!variables || typeof variables !== 'object') return template;
    
    let result = template;
    
    // Replace all occurrences of {{ variable_name }}
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      result = result.replace(regex, variables[key]);
    });
    
    return result;
  };