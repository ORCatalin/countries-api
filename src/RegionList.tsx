import { memo } from 'react';
import { List, ListItem as ChakraListItem, Text } from '@chakra-ui/react';

import type { Country } from './App';

export type Region = Omit<Country, 'region'> & {
  selected?: boolean;
  setSelectedRegion: (selectedRegion: string) => void;
};

const ListItem = memo((props: Region) => {
  console.log('rendering');
  const handleSelectedRegion = () => props.setSelectedRegion(props.name);
  return (
    <ChakraListItem
      onClick={handleSelectedRegion}
      key={props.name}
      display='flex'
      gap={2}
      mt={4}
      bg={props.selected ? 'gray.200' : 'transparent'}
      cursor='pointer'
    >
      <Text minW='80px' fontWeight='bold'>
        {props.name}
      </Text>
      :<Text>{props.population}</Text>
    </ChakraListItem>
  );
});

interface RegionListProps {
  regions: Region[];
  selectedRegion: string;
  setSelectedRegion: (selectedRegion: string) => void;
}

const RegionList = memo(
  ({ regions, selectedRegion, setSelectedRegion }: RegionListProps) => {
    return (
      <List>
        {regions.map(region => (
          <ListItem
            {...region}
            key={region.name}
            setSelectedRegion={setSelectedRegion}
            selected={selectedRegion === region.name}
          />
        ))}
      </List>
    );
  },
);

export default RegionList;
