import { DesktopItem } from 'src/app/types/desktopItems';

export const getTestDesktopItems = (): DesktopItem[] => {
  return [
    {
      id: 1,
      icon: 'dumpster',
      name: 'Recycle Bin',
      linkName: 'recyclebin',
      elements: [
        {
          id: 5,
          icon: 'folder',
          name: 'Test 1',
          linkName: 'test1',
          elements: [],
        },
      ],
    },
    {
      id: 2,
      icon: 'desktop',
      name: 'This PC',
      linkName: 'thispc',
      elements: [],
    },
    {
      id: 3,
      icon: 'folder',
      name: 'Folder',
      linkName: 'folder',
      elements: [
        {
          icon: 'file',
          name: 'Text 1',
          linkName: 'text1',
          content: 'Lorem Ipsum dolor',
          type: 'Text document',
          characters: 17,
        },
      ],
    },
    {
      id: 4,
      icon: 'folder',
      name: 'Folder 3',
      linkName: 'folder3',
      elements: [
        {
          icon: 'file',
          name: 'Text 3',
          linkName: 'text3',
          content: 'Lorem Ipsum dolor',
          type: 'Text document',
          characters: 17,
        },
      ],
    },
    {
      icon: 'file',
      name: 'Test1234',
      linkName: 'test1234',
      elements: [],
      id: 5,
    },
  ];
};
