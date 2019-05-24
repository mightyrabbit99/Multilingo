import { ActionCreator } from 'redux';
import * as actionTypes from './actionTypes';

export enum WorkspaceLocations {
  assessment = 'assessment',
  academy = 'academy',
  grading = 'grading'
}

export type WorkspaceLocation = keyof typeof WorkspaceLocations;

export const browseReplHistoryDown: ActionCreator<actionTypes.IAction> = (
  workspaceLocation: WorkspaceLocation
) => ({
  type: actionTypes.LOG_OUT,
  payload: { workspaceLocation }
});