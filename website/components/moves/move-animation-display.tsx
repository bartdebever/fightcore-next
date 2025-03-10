import { Move } from '@/models/move';
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Pagination } from "@heroui/pagination";
import { useState } from 'react';
import { FaExpand } from 'react-icons/fa6';
import ApngMove from './animations/apng-move-gif';
import { MoveGif } from './animations/move-gif';

export interface MoveAnimationDisplayParams {
  move: Move;
  characterName: string;
}

export default function MoveAnimationDisplay(params: Readonly<MoveAnimationDisplayParams>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  if (!params.move.pngUrl && (!params.move.alternativeAnimations || params.move.alternativeAnimations.length === 0)) {
    if (params.move.gifUrl) {
      return <MoveGif move={params.move} characterName={params.characterName} />;
    }
    return <em>There is no GIF available</em>;
  }

  if ((!params.move.alternativeAnimations || params.move.alternativeAnimations.length === 0) && params.move.pngUrl) {
    return (
      <div>
        <Button className="hidden md:inline-flex" isIconOnly aria-label="fullscreen" onPress={onOpen}>
          <FaExpand />
        </Button>
        <ApngMove url={params.move.pngUrl} />
        <FullScreenModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          move={params.move}
          characterName={params.characterName}
        />
      </div>
    );
  }

  const urlArray = [
    'invalid',
    params.move.pngUrl,
    ...params.move.alternativeAnimations!.map((animation) => animation.pngUrl),
  ];
  const descriptionArray = [
    'invalid',
    'Regular',
    ...params.move.alternativeAnimations!.map((animation) => animation.description),
  ];

  if (!params.move.pngUrl) {
    urlArray.splice(1, 1);
    descriptionArray.splice(1, 1);
  }

  return (
    <>
      <span className="block" key={'url' + currentPage}>
        {descriptionArray[currentPage]}
      </span>
      <Pagination
        total={urlArray.length - 1}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
        className="inline-flex w-2/3"
      />
      <Button isIconOnly aria-label="fullscreen" onPress={onOpen} className="float-right hidden md:inline-flex">
        <FaExpand />
      </Button>
      <ApngMove key={'gif' + currentPage} url={urlArray[currentPage]!} />
      <FullScreenModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        move={params.move}
        characterName={params.characterName}
        specificUrl={urlArray[currentPage]}
      />
    </>
  );
}

interface MoveAnimationModalParams extends MoveAnimationDisplayParams {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean | undefined;
  specificUrl?: string;
}

function FullScreenModal(params: Readonly<MoveAnimationModalParams>) {
  return (
    <Modal size="5xl" isOpen={params.isOpen} onOpenChange={params.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{params.move.name}</ModalHeader>
            <ModalBody>
              <ApngMove url={params.specificUrl ? params.specificUrl : params.move.pngUrl!} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
