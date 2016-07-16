// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  Application
} from 'phosphide/lib/core/application';

import {
  DocumentRegistry
} from '../docregistry';

import {
  FITSWidget, FITSWidgetFactory
} from './widget';


/**
 * The list of file extensions for csv tables.
 */
const EXTENSIONS = ['.fits'];


/**
 * The table file handler extension.
 */
export
const fitsHandlerExtension = {
  id: 'jupyter.extensions.fitsHandler',
  requires: [DocumentRegistry],
  activate: activateFITSWidget
};


/**
 * Activate the table widget extension.
 */
function activateFITSWidget(app: Application, registry: DocumentRegistry): void {
    let options = {
      fileExtensions: EXTENSIONS,
      defaultFor: EXTENSIONS,
      displayName: 'FITS Viewer',
      modelName: 'base64',
      preferKernel: false,
      canStartKernel: false
    };

    registry.addWidgetFactory(new FITSWidgetFactory(), options);

}
