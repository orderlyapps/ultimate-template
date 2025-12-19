export interface HelpTextState {
  dismissedIds: Set<string>;
  isGloballyDisabled: boolean;
  dismissHelpText: (id: string) => void;
  toggleGlobalDisable: () => void;
  reEnableGroup: (group: string) => void;
  shouldShow: (id: string) => boolean;
}

export interface HelpTextProps {
  id: string;
  group?: string;
  children: React.ReactNode;
}
