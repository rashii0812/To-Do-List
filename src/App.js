import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, Tag, Badge, Switch } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

let c = 5;

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  // time formating
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  var time = formatAMPM(new Date);

  var date = new Date(Date.now()).getFullYear()+ "-" + new Date(Date.now()).getMonth() + "-" + new Date(Date.now()).getDate();
  var Sentencer = require('sentencer');

    const [count, setCount] = useState(5);
    const [show, setShow] = useState(true);
  
    const increase = () => {
      setCount(count + 1);
    };
  
    const decline = () => {
      let newCount = count - 1;
  
      if (newCount < 0) {
        newCount = 0;
      }
  
      setCount(newCount);
    };
  
    const random = () => {
      const newCount = Math.floor(Math.random() * 100);
      setCount(newCount);
    };
  
    const onChange = (checked) => {
      setShow(checked);
    };
 
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      title: "What is Lorem Ipsum?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      TimeStamp: time,
      duedate: date,
      tags: ['nice', 'developer'],
    },
    {
      id: 2,
      title: "Why do we use it?",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      TimeStamp: time,
      duedate: date,
      tags: ['hello'],
    },
    {
      id: 3,
      title: "Where does it come from?",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      TimeStamp: time,
      duedate: date,
      tags: ['cool', 'teacher'],
    },
    {
      id: 4,
      title: "Where can I get some?",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      TimeStamp: time,
      duedate: date,
      tags: ['new'],
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "4",
      title: "Time",
      dataIndex: "TimeStamp",
      width: "5%"
    },
    {
      key: "5",
      title: "DueDate",
      dataIndex: "duedate",
      width: "10%"
    },
    {
      key: 'tags',
      title: 'Tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'hello') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      key: "7",
      title: "Status",
      dataIndex: "status",
      render: () => {
        return (
          <>
            <Badge dot={show}>
            </Badge>
            <Switch onChange={onChange} checked={show} />
          </>
        )
      }
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditEntry(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteEntry(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddEntry = () => {
    const newEntry = {
      id: c,
      title: Sentencer.make("This is a title for {{ an_adjective }} {{ noun }}"),
      description: Sentencer.make("This is a very short description for {{ a_noun }} and {{ an_adjective }} {{ noun }}"),
      TimeStamp: time,
      duedate: date,
      tags: [Sentencer.make("{{ noun }}"),Sentencer.make("{{ noun }}")]
    };
    c++;
    setDataSource((pre) => {
      return [...pre, newEntry];
    });
  };
  const onDeleteEntry = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((entry) => entry.id !== record.id);
        });
      },
    });
  };
  const onEditEntry = (record) => {
    setIsEditing(true);
    setEditingEntry({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEntry(null);
  };
  return (
    
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddEntry}>Add a new Entry</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Entry"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((entry) => {
                if (entry.id === editingEntry.id) {
                  return editingEntry;
                } else {
                  return entry;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingEntry?.title}
            placeholder={"Title"}
            onChange={(e) => {
              setEditingEntry((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingEntry?.description}
            placeholder={"Description"}
            maxlength={"100"}
            onChange={(e) => {
              setEditingEntry((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />
          <Input
            value={editingEntry?.duedate}
            type={"date"}
            onChange={(e) => {
              setEditingEntry((pre) => {
                return { ...pre, duedate: e.target.value };
              });
            }}
          />
          
        </Modal>
      </header>
    </div>
  );
}

export default App;
