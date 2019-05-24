import { WorkspaceLocation, WorkspaceLocations } from '../actions/workspaces';

export interface IState {
  readonly router: any;
  readonly session: any;
}

export interface IWorkspaceState {
  readonly editorValue: string | null;
  readonly editorBreakpoints: string[];
  readonly editorHighlights: number[][];
  readonly editorWidth: string;
  readonly isEditorAutorun: boolean;
  readonly isRunning: boolean;
  readonly isDebugging: boolean;
  readonly debuggerActive: boolean;
  readonly debuggerAllowed: boolean;
  readonly replValue: string;
  readonly sideContentActiveTab: number;
  readonly sideContentHeight?: number;
  readonly globals: Array<[string, any]>;
}

export interface IPlaygroundWorkspace extends IWorkspaceState {
  playgroundExternal: any;
}

export interface IWorkspaceManagerState {
  readonly playground: IPlaygroundWorkspace;
}

export const createDefaultWorkspace = (location: WorkspaceLocation): IWorkspaceState => ({
  editorValue: null,
  editorBreakpoints: [],
  editorHighlights: [],
  editorWidth: '50%',
  replValue: '',
  sideContentActiveTab: 0,
  globals: [],
  isEditorAutorun: false,
  isRunning: false,
  isDebugging: false,
  debuggerActive: false,
  debuggerAllowed: true
});

export const defaultSession: ISessionState = {

};

export const defaultWorkspaceManager: IWorkspaceManagerState = {
  playground: {
    ...createDefaultWorkspace(WorkspaceLocations.academy),
    playgroundExternal: undefined
  }
};

export const defaultState: IState = {
  router: 1,
  session: defaultSession
};

export interface ISessionState {}