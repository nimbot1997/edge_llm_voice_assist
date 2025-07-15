


export class Downloader {
  private container: HTMLElement;
  private progressBar: HTMLElement | null = null;
  private statusText: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="fixed inset-0 bg-base-100 bg-opacity-95 flex items-center justify-center z-50">
        <div class="card w-96 bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Downloading AI Model</h2>
            <p class="text-sm text-base-content/70 mb-4">
              This is a one-time download (~230 MB). The model will be cached for offline use.
            </p>

            <div class="space-y-4">
              <div class="w-full bg-base-300 rounded-full h-2">
                <div id="download-progress" class="bg-primary h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>

              <div class="flex justify-between text-sm">
                <span id="download-status">Initializing...</span>
                <span id="download-size">0 MB / 230 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.progressBar = document.getElementById('download-progress');
    this.statusText = document.getElementById('download-status');
  }

  updateProgress(percentage: number, loaded: number, total: number) {
    if (this.progressBar) {
      this.progressBar.style.width = `${percentage}%`;
    }

    if (this.statusText) {
      this.statusText.textContent = `${percentage}%`;
    }

    const sizeElement = document.getElementById('download-size');
    if (sizeElement) {
      const loadedMB = (loaded / 1024 / 1024).toFixed(1);
      const totalMB = (total / 1024 / 1024).toFixed(1);
      sizeElement.textContent = `${loadedMB} MB / ${totalMB} MB`;
    }
  }

  hide() {
    this.container.style.display = 'none';
  }

  show() {
    this.container.style.display = 'block';
  }
}


