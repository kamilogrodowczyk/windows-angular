import { WindowsSettings } from '../types/windowsSettings';

export const windowsSettings: WindowsSettings[] = [
  {
    icon: 'desktop',
    name: 'System',
    linkName: 'settings/system',
    text: 'Display, sound, notifications, power',
    elements: [
      {
        icon: 'desktop',
        name: 'Display',
      },
    ],
  },
  {
    icon: 'paint-brush',
    name: 'Personalize',
    linkName: 'settings/personalize',
    text: 'Background, lock screen, colors',
    elements: [
      {
        icon: 'paint-brush',
        name: 'Background',
      },
      {
        icon: 'palette',
        name: 'Colors',
      },
    ],
  },
];
