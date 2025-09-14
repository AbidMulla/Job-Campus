// Confirmation Modal Utility
interface ConfirmModalOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  icon?: string;
}

class ConfirmModal {
  private modal: HTMLElement | null = null;
  private overlay: HTMLElement | null = null;
  private isInitialized: boolean = false;

  constructor() {
    // Don't initialize immediately - wait for client-side usage
  }

  private ensureInitialized() {
    if (this.isInitialized) return;
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('ConfirmModal: Not in browser environment, skipping initialization');
      return;
    }
    
    this.isInitialized = true;
  }

  private createModal(options: ConfirmModalOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.ensureInitialized();
      
      if (!this.isInitialized) {
        resolve(false);
        return;
      }

      const {
        title = 'Confirm Action',
        message = 'Are you sure you want to proceed?',
        confirmText = 'Yes',
        cancelText = 'Cancel',
        type = 'warning',
        icon = '⚠️'
      } = options;

      // Create overlay
      this.overlay = document.createElement('div');
      this.overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;

      // Create modal
      this.modal = document.createElement('div');
      this.modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        transform: scale(0.9) translateY(-20px);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        opacity: 0;
      `;

      // Get colors based on type
      const typeConfig = {
        danger: {
          iconColor: '#ef4444',
          confirmBg: '#ef4444',
          confirmHover: '#dc2626'
        },
        warning: {
          iconColor: '#f59e0b',
          confirmBg: '#f59e0b',
          confirmHover: '#d97706'
        },
        info: {
          iconColor: '#3b82f6',
          confirmBg: '#3b82f6',
          confirmHover: '#2563eb'
        }
      };

      const config = typeConfig[type];

      // Modal content
      this.modal.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <div style="
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: ${config.iconColor}20;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            font-size: 24px;
          ">
            ${icon}
          </div>
          <h3 style="
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #111827;
          ">${title}</h3>
        </div>
        
        <p style="
          margin: 0 0 24px 0;
          color: #6b7280;
          line-height: 1.5;
          font-size: 14px;
        ">${message}</p>
        
        <div style="
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        ">
          <button id="cancel-btn" style="
            padding: 8px 16px;
            border: 1px solid #d1d5db;
            background: white;
            color: #374151;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ${cancelText}
          </button>
          <button id="confirm-btn" style="
            padding: 8px 16px;
            border: none;
            background: ${config.confirmBg};
            color: white;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
          ">
            <span id="confirm-text">${confirmText}</span>
            <div id="confirm-loader" style="
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 16px;
              height: 16px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            "></div>
          </button>
        </div>
      `;

      // Add spinner animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      // Add hover effects
      const cancelBtn = this.modal.querySelector('#cancel-btn') as HTMLElement;
      const confirmBtn = this.modal.querySelector('#confirm-btn') as HTMLElement;
      const confirmTextElement = this.modal.querySelector('#confirm-text') as HTMLElement;
      const confirmLoader = this.modal.querySelector('#confirm-loader') as HTMLElement;

      cancelBtn.addEventListener('mouseenter', () => {
        cancelBtn.style.backgroundColor = '#f9fafb';
        cancelBtn.style.borderColor = '#9ca3af';
      });
      
      cancelBtn.addEventListener('mouseleave', () => {
        cancelBtn.style.backgroundColor = 'white';
        cancelBtn.style.borderColor = '#d1d5db';
      });

      confirmBtn.addEventListener('mouseenter', () => {
        confirmBtn.style.backgroundColor = config.confirmHover;
      });
      
      confirmBtn.addEventListener('mouseleave', () => {
        confirmBtn.style.backgroundColor = config.confirmBg;
      });

      // Event handlers
      const cleanup = (skipAnimation = false) => {
        if (this.overlay && this.overlay.parentNode) {
          if (!skipAnimation) {
            this.overlay.style.opacity = '0';
            this.modal!.style.transform = 'scale(0.9) translateY(-20px)';
            this.modal!.style.opacity = '0';
          }
          
          setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
              this.overlay.parentNode.removeChild(this.overlay);
            }
            this.overlay = null;
            this.modal = null;
          }, skipAnimation ? 0 : 300);
        }
      };

      const showLoader = () => {
        confirmTextElement.style.opacity = '0';
        confirmLoader.style.display = 'block';
        confirmBtn.style.pointerEvents = 'none';
        cancelBtn.style.pointerEvents = 'none';
      };

      cancelBtn.onclick = () => {
        cleanup();
        resolve(false);
      };

      confirmBtn.onclick = async () => {
        showLoader();
        
        // Show loader for 500ms for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Add smooth fade out animation before cleanup
        if (this.overlay && this.modal) {
          this.overlay.style.opacity = '0';
          this.modal.style.transform = 'scale(0.9) translateY(-20px)';
          this.modal.style.opacity = '0';
          
          // Wait for animation to complete before cleanup
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        cleanup(true);
        resolve(true);
      };

      // Close on overlay click
      this.overlay.onclick = (e) => {
        if (e.target === this.overlay) {
          cleanup();
          resolve(false);
        }
      };

      // Close on Escape key
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          cleanup();
          resolve(false);
          document.removeEventListener('keydown', handleKeyPress);
        }
      };
      document.addEventListener('keydown', handleKeyPress);

      // Add to DOM
      this.overlay.appendChild(this.modal);
      document.body.appendChild(this.overlay);

      // Animate in
      setTimeout(() => {
        if (this.overlay && this.modal) {
          this.overlay.style.opacity = '1';
          this.modal.style.transform = 'scale(1) translateY(0)';
          this.modal.style.opacity = '1';
        }
      }, 10);
    });
  }

  // Main confirm method
  async confirm(options: ConfirmModalOptions = {}): Promise<boolean> {
    return this.createModal(options);
  }

  // Convenience methods
  async confirmDelete(itemName?: string): Promise<boolean> {
    return this.createModal({
      title: 'Delete Confirmation',
      message: itemName 
        ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
        : 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      icon: '🗑️'
    });
  }

  async confirmAction(action: string, details?: string): Promise<boolean> {
    return this.createModal({
      title: `Confirm ${action}`,
      message: details || `Are you sure you want to ${action.toLowerCase()}?`,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      type: 'warning',
      icon: '⚠️'
    });
  }
}

// Singleton instance
let confirmModalInstance: ConfirmModal | null = null;

const getConfirmModal = (): ConfirmModal => {
  if (!confirmModalInstance) {
    confirmModalInstance = new ConfirmModal();
  }
  return confirmModalInstance;
};

// Export convenience functions
export const showConfirm = (options?: ConfirmModalOptions): Promise<boolean> => {
  return getConfirmModal().confirm(options);
};

export const showDeleteConfirm = (itemName?: string): Promise<boolean> => {
  return getConfirmModal().confirmDelete(itemName);
};

export const showActionConfirm = (action: string, details?: string): Promise<boolean> => {
  return getConfirmModal().confirmAction(action, details);
};

export default getConfirmModal;
