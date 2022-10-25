import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChakraProvider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import type { Region } from './RegionList';
import RegionList from './RegionList';

const apiIUrl = 'https://restcountries.com/v2/lang/en';

export interface Country {
  name: string;
  region: string;
  population: number;
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectedRegion = useCallback((region: string) => {
    setSelectedRegion(region);
    onOpen();
  }, [setSelectedRegion, onOpen]);

  const regions = useMemo<Region[]>(() => {
    const regionsMem = countries.reduce<{ [key: string]: number }>(
      (acc, country) => {
        if (acc[country.region]) {
          acc[country.region] += country.population;
        } else {
          acc[country.region] = country.population;
        }
        return acc;
      },
      {},
    );
    return Object.keys(regionsMem).map(key => ({
      name: key,
      population: regionsMem[key],
    }));
  }, [countries]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(apiIUrl);
        const jsonResponse = await response.json();
        setCountries(jsonResponse);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCountries().then(() => {});
  }, []);

  return (
    <ChakraProvider>
      <Flex justify='center' w='full' pt={8}>
        <RegionList
          regions={regions}
          selectedRegion={selectedRegion}
          setSelectedRegion={handleSelectedRegion}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedRegion}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {regions.find(r => r.name === selectedRegion)?.population}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default App;
