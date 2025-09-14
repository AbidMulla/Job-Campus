// Simple Toast Notification Utility
interface ToastOptions {
  duration?: number;
  type?: 'success' | 'error' | 'info' | 'warning';
}

class SimpleToast {
  private container: HTMLElement | null = null;
  private isInitialized: boolean = false;

  constructor() {
    // Don't initialize immediately - wait for client-side usage
  }

  private ensureInitialized() {
    if (this.isInitialized) return;
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('SimpleToast: Not in browser environment, skipping initialization');
      return;
    }
    
    this.createContainer();
    this.isInitialized = true;
  }

  private createContainer() {
    // Create toast container if it doesn't exist
    this.container = document.getElementById('toast-container');
    
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        width: 100%;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    } else {
      // Update existing container positioning
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        width: 100%;
        pointer-events: none;
      `;
    }
  }

  private getToastStyles(type: string) {
    const baseStyles = `
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%) scale(0.95);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      max-width: 300px;
      word-wrap: break-word;
      pointer-events: auto;
      margin: 0 auto;
      opacity: 0;
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    `;

    const typeStyles = {
      success: 'background-color: #10b981;',
      error: 'background-color: #ef4444;',
      info: 'background-color: #3b82f6;',
      warning: 'background-color: #f59e0b;'
    };

    return baseStyles + typeStyles[type as keyof typeof typeStyles];
  }

  show(message: string, options: ToastOptions = {}) {
    const { duration = 3000, type = 'info' } = options;
    
    // Ensure we're initialized and in browser environment
    this.ensureInitialized();
    
    // If not in browser environment, just log the message
    if (!this.isInitialized || !this.container) {
      console.log(`Toast (${type}): ${message}`);
      return;
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = this.getToastStyles(type);

    // Create text element
    const textElement = document.createElement('span');
    textElement.textContent = message;
    textElement.style.cssText = `
      flex: 1;
      line-height: 1.4;
    `;

    // Add close button with smooth hover effects
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      padding: 2px 4px;
      line-height: 1;
      border-radius: 50%;
      transition: all 0.2s ease;
      opacity: 0.8;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    `;
    
    // Add hover effects
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.opacity = '1';
      closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.opacity = '0.8';
      closeBtn.style.backgroundColor = 'transparent';
      closeBtn.style.transform = 'scale(1)';
    });
    
    closeBtn.onclick = () => this.removeToast(toast);
    
    // Append text and close button to toast
    toast.appendChild(textElement);
    toast.appendChild(closeBtn);

    // Add hover effect to toast
    toast.addEventListener('mouseenter', () => {
      toast.style.transform = 'translateY(0) scale(1.02)';
      toast.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2), 0 3px 12px rgba(0, 0, 0, 0.15)';
    });
    
    toast.addEventListener('mouseleave', () => {
      toast.style.transform = 'translateY(0) scale(1)';
      toast.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)';
    });

    // Add to container
    this.container?.appendChild(toast);

    // Animate in with smooth entrance
    setTimeout(() => {
      toast.style.transform = 'translateY(0) scale(1)';
      toast.style.opacity = '1';
    }, 10);

    // Auto remove
    const timeoutId = setTimeout(() => {
      this.removeToast(toast);
    }, duration);

    // Store timeout ID for manual removal
    (toast as any).timeoutId = timeoutId;
  }

  private removeToast(toast: HTMLElement) {
    // Clear timeout if exists
    if ((toast as any).timeoutId) {
      clearTimeout((toast as any).timeoutId);
    }

    // Animate out with smooth exit
    toast.style.transform = 'translateY(-100%) scale(0.95)';
    toast.style.opacity = '0';
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }

  // Convenience methods
  success(message: string, duration?: number) {
    this.show(message, { type: 'success', duration });
  }

  error(message: string, duration?: number) {
    this.show(message, { type: 'error', duration });
  }

  info(message: string, duration?: number) {
    this.show(message, { type: 'info', duration });
  }

  warning(message: string, duration?: number) {
    this.show(message, { type: 'warning', duration });
  }
}

// Lazy singleton instance
let simpleToastInstance: SimpleToast | null = null;

const getSimpleToast = (): SimpleToast => {
  if (!simpleToastInstance) {
    simpleToastInstance = new SimpleToast();
  }
  return simpleToastInstance;
};

// Export convenience functions
export const showToast = (message: string, options?: ToastOptions) => {
  getSimpleToast().show(message, options);
};

export const showSuccessToast = (message: string, duration?: number) => {
  getSimpleToast().success(message, duration);
};

export const showErrorToast = (message: string, duration?: number) => {
  getSimpleToast().error(message, duration);
};

export const showInfoToast = (message: string, duration?: number) => {
  getSimpleToast().info(message, duration);
};

export const showWarningToast = (message: string, duration?: number) => {
  getSimpleToast().warning(message, duration);
};

export default getSimpleToast;
