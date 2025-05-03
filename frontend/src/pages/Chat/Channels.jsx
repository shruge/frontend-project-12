import { PlusSquare } from 'react-bootstrap-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { setCurrChannel } from '../../store/slices/globalSlice';
import { openModal } from '../../store/slices/modalSlice';

const Channels = ({ t, channels, currChannelId }) => {
  const dispatch = useDispatch();

  const setBtnVariant = (id) => (id === currChannelId ? 'secondary' : '');

  const showModal = () => {
    dispatch(openModal({ mode: 'add' }));
  };

  const activeChannel = (id) => () => {
    dispatch(setCurrChannel({ id }));
  };

  const removeChannel = (channelId) => () => {
    dispatch(openModal({ channelId, mode: 'remove' }));
  };

  const renameChannel = (channelId) => () => {
    dispatch(openModal({ mode: 'rename', channelId }));
  };

  const createDropBtn = (id, channelName, removable) => {
    const btn = (
      <Button
        type="button"
        onClick={activeChannel(id)}
        variant={setBtnVariant(id)}
        className="w-100 rounded-0 text-start"
      >
        <span className="me-1">#</span>
        {channelName}
      </Button>
    );

    if (removable) {
      return (
        <ButtonGroup className="d-flex show dropdown">
          {btn}
          <DropdownButton
            variant={setBtnVariant(id)}
            title={<span className="visually-hidden">Управление каналом</span>}
          >
            <Dropdown.Item onClick={removeChannel(id)}>{t('buttons.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={renameChannel(id)}>{t('buttons.rename')}</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      );
    }

    return btn;
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('sideBarTitle')}</b>
        <Button
          variant=""
          type="button"
          onClick={showModal}
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare size="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.length > 0 && channels.map(({ id, name, removable }) => (
          <li className="nav-item w-100" key={id}>
            {createDropBtn(id, name, removable)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
