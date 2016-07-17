// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  IKernel
} from 'jupyter-js-services';

import {
  Message
} from 'phosphor-messaging';

import {
  Widget
} from 'phosphor-widget';

import {
  ABCWidgetFactory, IDocumentModel, IDocumentContext
} from '../docregistry';

/**
 * The class name added to a csv widget.
 */
const FITS_CLASS = 'jp-FITSWidget';


/**
 * A widget for FITS tables.
 */
export
class FITSWidget extends Widget {
  /**
   * Open a FITS image.
   */
  constructor(context: IDocumentContext<IDocumentModel>) {
    super();
    this._context = context;
    this.node.tabIndex = -1;
    this.addClass(FITS_CLASS);

    if (context.model.toString()) {
      this.update();
    }
    context.pathChanged.connect(() => {
      this.update();
    });
    context.model.contentChanged.connect(() => {
      this.update();
    });
    context.contentsModelChanged.connect(() => {
      this.update();
    });
    this.renderFITS();
  }

  /**
   * Dispose of the resources used by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._context = null;
    super.dispose();
  }

  /**
   * Handle `update-request` messages for the widget.
   */
  protected onUpdateRequest(msg: Message): void {
    this.title.text = this._context.path.split('/').pop();
    let cm = this._context.contentsModel;
    if (cm === null) {
      return;
    }
    if (this.isAttached && this._context.model.toString()) {
      if ((window as any).JS9.displays.length == 0) {
        (window as any).JS9.AddDivs("JS9");
      }
      (window as any).JS9.Load(this._context.model.toString(), {"filename": this.title.text}, {"display": "JS9"});
    }


  }

  /**
   * Render FITS image
   */
  renderFITS() {
    let menuBar = document.createElement('div');
    let main = document.createElement('div');
    let colorbar = document.createElement('div');

    menuBar.className = "JS9Menubar";
    main.className = "JS9";
    main.setAttribute("id", "JS9");
    colorbar.className = "JS9Colorbar";
    this.node.textContent = '';
    this.node.appendChild(menuBar);
    this.node.appendChild(main);
    this.node.appendChild(colorbar);

  }

  onAfterAttach() {
    this.update();
  }
  private _context: IDocumentContext<IDocumentModel>;
}


/**
 * A widget factory for FITS images.
 */
export
class FITSWidgetFactory extends ABCWidgetFactory<FITSWidget, IDocumentModel> {
  /**
   * Create a new widget given a context.
   */
  createNew(context: IDocumentContext<IDocumentModel>, kernel?: IKernel.IModel): FITSWidget {
    let widget = new FITSWidget(context);
    this.widgetCreated.emit(widget);
    return widget;
  }
}
