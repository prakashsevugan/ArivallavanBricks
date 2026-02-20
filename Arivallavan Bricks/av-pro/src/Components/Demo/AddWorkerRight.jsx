import React from "react";

function AddWorkerRight(){
    return(
        <>
         <div className="main-content">
    <div className="page-content">
      <div className="container-fluid">
        {/* start page title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
              <h4 className="mb-sm-0">Basic Elements</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Forms</a>
                  </li>
                  <li className="breadcrumb-item active">Basic Elements</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* end page title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Input Example</h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="form-grid-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="form-grid-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="basiInput" className="form-label">
                          Basic Input
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="basiInput"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="labelInput" className="form-label">
                          Input with Label
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="labelInput"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="placeholderInput"
                          className="form-label"
                        >
                          Input with Placeholder
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="placeholderInput"
                          placeholder="Placeholder"
                        />
                      </div>
                    </div>

                    
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="valueInput" className="form-label">
                          Input with Value
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="valueInput"
                          defaultValue="Input value"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="readonlyPlaintext"
                          className="form-label"
                        >
                          Readonly Plain Text Input
                        </label>
                        <input
                          type="text"
                          className="form-control-plaintext"
                          id="readonlyPlaintext"
                          defaultValue="Readonly input"
                          readOnly=""
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="readonlyInput" className="form-label">
                          Readonly Input
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="readonlyInput"
                          defaultValue="Readonly input"
                          readOnly=""
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="disabledInput" className="form-label">
                          Disabled Input
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="disabledInput"
                          defaultValue="Disabled input"
                          disabled=""
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="iconInput" className="form-label">
                          Input with Icon
                        </label>
                        <div className="form-icon">
                          <input
                            type="email"
                            className="form-control form-control-icon"
                            id="iconInput"
                            placeholder="example@gmail.com"
                          />
                          <i className="ri-mail-unread-line" />
                        </div>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="iconrightInput" className="form-label">
                          Input with Icon Right
                        </label>
                        <div className="form-icon right">
                          <input
                            type="email"
                            className="form-control form-control-icon"
                            id="iconrightInput"
                            placeholder="example@gmail.com"
                          />
                          <i className="ri-mail-unread-line" />
                        </div>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="exampleInputdate"
                          className="form-label"
                        >
                          Input Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="exampleInputdate"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="exampleInputtime"
                          className="form-label"
                        >
                          Input Time
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          id="exampleInputtime"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="exampleInputpassword"
                          className="form-label"
                        >
                          Input Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputpassword"
                          defaultValue={44512465}
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="exampleFormControlTextarea5"
                          className="form-label"
                        >
                          Example Textarea
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea5"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="formtextInput" className="form-label">
                          Form Text
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="formtextInput"
                        />
                        <div id="passwordHelpBlock" className="form-text">
                          Must be 8-20 characters long.
                        </div>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="colorPicker" className="form-label">
                          Color Picker
                        </label>
                        <input
                          type="color"
                          className="form-control form-control-color w-100"
                          id="colorPicker"
                          defaultValue="#364574"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label htmlFor="borderInput" className="form-label">
                          Input Border Style
                        </label>
                        <input
                          type="text"
                          className="form-control border-dashed"
                          id="borderInput"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <label htmlFor="exampleDataList" className="form-label">
                        Datalist example
                      </label>
                      <input
                        className="form-control"
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder="Search your country..."
                      />
                      <datalist id="datalistOptions">
                        <option value="Switzerland"></option>
                        <option value="New York"></option>
                        <option value="France"></option>
                        <option value="Spain"></option>
                        <option value="Chicago"></option>
                        <option value="Bulgaria"></option>
                        <option value="Hong Kong"></option>
                      </datalist>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div>
                        <label
                          htmlFor="exampleInputrounded"
                          className="form-label"
                        >
                          Rounded Input
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          id="exampleInputrounded"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-xxl-3 col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="firstnamefloatingInput"
                          placeholder="Enter your firstname"
                        />
                        <label htmlFor="firstnamefloatingInput">
                          Floating Input
                        </label>
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 450 }}>
                    <code>
                      &lt;!-- Basic Input --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="basiInput"
                      class="form-label"&gt;Basic Input&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="password" class="form-control"
                      id="basiInput"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input with Label --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="labelInput"
                      class="form-label"&gt;Input with Label&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="password" class="form-control"
                      id="labelInput"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input with Placeholder --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;label for="placeholderInput"
                      class="form-label"&gt;Input with Placeholder&lt;/label&gt;
                      {"\n"}
                      {"    "}&lt;input type="password" class="form-control"
                      id="placeholderInput" placeholder="Placeholder"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input with Value --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="valueInput"
                      class="form-label"&gt;Input with Value&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      id="valueInput" value="Input value"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Readonly Plain Text Input --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;label for="readonlyPlaintext"
                      class="form-label"&gt;Readonly Plain Text
                      Input&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="text"
                      class="form-control-plaintext" id="readonlyPlaintext"
                      value="Readonly input" readonly&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Readonly Input --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="readonlyInput"
                      class="form-label"&gt;Readonly Input&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      id="readonlyInput" value="Readonly input" readonly&gt;
                      {"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Disabled Input --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="disabledInput"
                      class="form-label"&gt;Disabled Input&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      id="disabledInput" value="Disabled input" disabled&gt;
                      {"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input with Icon --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="iconInput"
                      class="form-label"&gt;Input with Icon&lt;/label&gt;{"\n"}
                      {"    "}&lt;div class="form-icon"&gt;{"\n"}
                      {"        "}&lt;input type="email" class="form-control
                      form-control-icon" id="iconInput"
                      placeholder="example@gmail.com"&gt;{"\n"}
                      {"        "}&lt;i
                      class="ri-mail-unread-line"&gt;&lt;/i&gt;{"\n"}
                      {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input with Icon Right --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;label for="iconrightInput"
                      class="form-label"&gt;Input with Icon Right&lt;/label&gt;
                      {"\n"}
                      {"    "}&lt;div class="form-icon right"&gt;{"\n"}
                      {"        "}&lt;input type="email" class="form-control
                      form-control-icon" id="iconrightInput"
                      placeholder="example@gmail.com"&gt;{"\n"}
                      {"        "}&lt;i
                      class="ri-mail-unread-line"&gt;&lt;/i&gt;{"\n"}
                      {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input Date --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="exampleInputdate"
                      class="form-label"&gt;Input Date&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="date" class="form-control"
                      id="exampleInputdate"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input Time --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="exampleInputtime"
                      class="form-label"&gt;Input Time&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="time" class="form-control"
                      id="exampleInputtime" value="08:56 AM"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input Password --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="exampleInputpassword"
                      class="form-label"&gt;Input Password&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="password" class="form-control"
                      id="exampleInputpassword" value="44512465"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Example Textarea --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="exampleFormControlTextarea5"
                      class="form-label"&gt;Example Textarea&lt;/label&gt;{"\n"}
                      {"    "}&lt;textarea class="form-control"
                      id="exampleFormControlTextarea5"
                      rows="3"&gt;&lt;/textarea&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Form Text --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="formtextInput"
                      class="form-label"&gt;Form Text&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="password" class="form-control"
                      id="formtextInput"&gt;{"\n"}
                      {"    "}&lt;div id="passwordHelpBlock"
                      class="form-text"&gt;{"\n"}
                      {"        "}Must be 8-20 characters long.{"\n"}
                      {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Color Picker --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="colorPicker"
                      class="form-label"&gt;Color Picker&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="color" class="form-control
                      form-control-color w-100" id="colorPicker"
                      value="#364574"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Input Border Style --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="borderInput"
                      class="form-label"&gt;Input Border Style&lt;/label&gt;
                      {"\n"}
                      {"    "}&lt;input type="text" class="form-control
                      border-dashed" id="borderInput" placeholder="Enter your
                      name"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Datalist example --&gt;{"\n"}&lt;label
                      for="exampleDataList" class="form-label"&gt;Datalist
                      example&lt;/label&gt;{"\n"}&lt;input class="form-control"
                      list="datalistOptions" id="exampleDataList"
                      placeholder="Search your country..."&gt;{"\n"}&lt;datalist
                      id="datalistOptions"&gt;{"\n"}
                      {"    "}&lt;option value="Switzerland"&gt;{"\n"}
                      {"    "}&lt;option value="New York"&gt;{"\n"}
                      {"    "}&lt;option value="France"&gt;{"\n"}
                      {"    "}&lt;option value="Spain"&gt;{"\n"}
                      {"    "}&lt;option value="Chicago"&gt;{"\n"}
                      {"    "}&lt;option value="Bulgaria"&gt;{"\n"}
                      {"    "}&lt;option value="Hong Kong"&gt;{"\n"}
                      &lt;/datalist&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Rounded Input --&gt;{"\n"}&lt;div&gt;{"\n"}
                      {"    "}&lt;label for="exampleInputrounded"
                      class="form-label"&gt;Rounded Input&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control
                      rounded-pill" id="exampleInputrounded" placeholder="Enter
                      your name"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Floating Input --&gt;{"\n"}&lt;div
                      class="form-floating"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      id="firstnamefloatingInput" placeholder="Enter your
                      firstname"&gt;{"\n"}
                      {"    "}&lt;label for="firstnamefloatingInput"&gt;Floating
                      Input&lt;/label&gt;{"\n"}&lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Input Sizing</h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="sizing-input-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="sizing-input-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <p className="text-muted">
                  Use <code>form-control-lg</code> class to set large size input
                  and Use <code>form-control-sm</code> class to set small size
                  input. No class is needed for default size input.
                </p>
                <div className="live-preview">
                  <div className="row align-items-center g-3">
                    <div className="col-lg-4">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder=".form-control-sm"
                      />
                    </div>
                    {/*end col*/}
                    <div className="col-lg-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder=".form-control"
                      />
                    </div>
                    {/*end col*/}
                    <div className="col-lg-4">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder=".form-control-lg"
                      />
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup">
                    <code>
                      &lt;!-- Form Control Sm --&gt;{"\n"}&lt;input
                      class="form-control form-control-sm" type="text"
                      placeholder=".form-control-sm"&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Form Control Default --&gt;{"\n"}&lt;input
                      class="form-control" type="text"
                      placeholder=".form-control-sm"&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Form Control Lg --&gt;{"\n"}&lt;input
                      class="form-control form-control-lg" type="text"
                      placeholder=".form-control-sm"&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">File Input</h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="file-input-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="file-input-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <div className="live-preview">
                  <div className="row align-items-center g-3">
                    <div className="col-lg-4">
                      <div>
                        <label htmlFor="formFile" className="form-label">
                          Default File Input Example
                        </label>
                        <p className="text-muted">
                          Use <code>input</code> attribute with{" "}
                          <code>type="file"</code> tag for default file input
                        </p>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-4">
                      <div>
                        <label
                          htmlFor="formFileMultiple"
                          className="form-label"
                        >
                          Multiple Files Input Example
                        </label>
                        <p className="text-muted">
                          Use <code>multiple</code> attribute within the input
                          attribute to select multiple files.
                        </p>
                        <input
                          className="form-control"
                          type="file"
                          id="formFileMultiple"
                          multiple=""
                        />
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-4">
                      <div>
                        <label
                          htmlFor="formFileDisabled"
                          className="form-label"
                        >
                          Disabled File Input Example
                        </label>
                        <p className="text-muted">
                          Use <code>disabled</code> attribute within the input
                          attribute to disable the file input.
                        </p>
                        <input
                          className="form-control"
                          type="file"
                          id="formFileDisabled"
                          disabled=""
                        />
                      </div>
                    </div>
                  </div>
                  {/*end row*/}
                  <div className="row mt-4 align-items-center g-3">
                    <h5 className="fs-14">File Input Sizing</h5>
                    <div className="col-lg-4">
                      <div>
                        <label htmlFor="formSizeSmall" className="form-label">
                          Small Size File Input Example
                        </label>
                        <p className="text-muted">
                          Use <code>form-control-sm</code> class within the
                          form-control class to set a small size file input.
                        </p>
                        <input
                          className="form-control form-control-sm"
                          id="formSizeSmall"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label htmlFor="formSizeDefault" className="form-label">
                          Default Size File Input Example
                        </label>
                        <p className="text-muted">
                          Use <code>form-control </code>class and{" "}
                          <code>type="file"</code> attribute within the input
                          attribute to set a default size file input.
                        </p>
                        <input
                          className="form-control"
                          id="formSizeDefault"
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <label htmlFor="formSizeLarge" className="form-label">
                          Large Size File Input Example
                        </label>
                        <p className="text-muted">
                          Use <code>form-control-lg</code> class within the
                          form-control class to set a large size file input.
                        </p>
                        <input
                          className="form-control form-control-lg"
                          id="formSizeLarge"
                          type="file"
                        />
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Default File Input Example --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;label for="formFile"
                      class="form-label"&gt;Default file input
                      example&lt;/label&gt;{"\n"}
                      {"    "}&lt;input class="form-control" type="file"
                      id="formFile"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Multiple Files Input Example --&gt;{"\n"}
                      &lt;div&gt;{"\n"}
                      {"    "}&lt;label for="formFileMultiple"
                      class="form-label"&gt;Multiple files input
                      example&lt;/label&gt;{"\n"}
                      {"    "}&lt;input class="form-control" type="file"
                      id="formFileMultiple" multiple&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Disabled File Input Example --&gt;{"\n"}
                      &lt;div&gt;{"\n"}
                      {"    "}&lt;label for="formFileDisabled"
                      class="form-label"&gt;Disabled File Input
                      Example&lt;/label&gt;{"\n"}
                      {"    "}&lt;input class="form-control" type="file"
                      id="formFileDisabled" disabled&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- File Input Sizing Small --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;input class="form-control form-control-sm"
                      id="formFileSm" type="file"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- File Input Sizing Default --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;input class="form-control" id="formFileSm"
                      type="file"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- File Input Sizing Large --&gt;{"\n"}&lt;div&gt;
                      {"\n"}
                      {"    "}&lt;input class="form-control form-control-lg"
                      id="formFileSm" type="file"&gt;{"\n"}&lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Input Group</h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="input-group-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="input-group-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <div className="live-preview">
                  <div>
                    <h5 className="fs-15">Basic example</h5>
                    <p className="text-muted">
                      Use <code>input-group</code> class to div element which
                      contains input attribute to wrap a default input in the
                      group.
                    </p>
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            @
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          />
                          <span className="input-group-text" id="basic-addon2">
                            @example.com
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Amount (to the nearest dollar)"
                          />
                          <span className="input-group-text">.00</span>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                          />
                          <span className="input-group-text">@</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Server"
                            aria-label="Server"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <span className="input-group-text">
                            With textarea
                          </span>
                          <textarea
                            className="form-control"
                            aria-label="With textarea"
                            rows={2}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="basic-url" className="form-label">
                          Your vanity URL
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon3">
                            https://example.com/users/
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="basic-url"
                            aria-describedby="basic-addon3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="fs-15">Wrapping</h5>
                    <p className="text-muted">
                      Input groups wrap by default via{" "}
                      <code>flex-wrap: wrap</code> in order to accommodate
                      custom form field validation within an input group. You
                      may disable this with <code>flex-nowrap</code> class.
                    </p>
                    <div className="input-group flex-nowrap">
                      <span className="input-group-text" id="addon-wrapping">
                        @
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Basic example --&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="basic-addon1"&gt;@&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="Username" aria-label="Username"
                      aria-describedby="basic-addon1"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="Recipient's username" aria-label="Recipient's
                      username" aria-describedby="basic-addon2"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="basic-addon2"&gt;@example.com&lt;/span&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;$&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Amount (to the nearest dollar)"&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;.00&lt;/span&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="Username" aria-label="Username"&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;@&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="Server" aria-label="Server"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"&gt;With
                      textarea&lt;/span&gt;{"\n"}
                      {"    "}&lt;textarea class="form-control" aria-label="With
                      textarea" rows="2"&gt;&lt;/textarea&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;label for="basic-url" class="form-label"&gt;Your
                      vanity URL&lt;/label&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="basic-addon3"&gt;https://example.com/users/&lt;/span&gt;
                      {"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      id="basic-url" aria-describedby="basic-addon3"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Wrapping --&gt;{"\n"}&lt;div class="input-group
                      flex-nowrap"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="addon-wrapping"&gt;@&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="Username" aria-label="Username"
                      aria-describedby="addon-wrapping"&gt;{"\n"}&lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Input Group Sizing
                </h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="input-group-sizing-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="input-group-sizing-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <p className="text-muted">
                  Use <code>input-group-sm</code> class to set a small size
                  input group and <code>input-group-lg</code> class to
                  input-group class to set a large size input group
                  respectively. no such class is required for a default size
                  input group.
                </p>
                <div className="live-preview">
                  <div className="row align-items-center g-3">
                    <div className="col-lg-4">
                      <div className="input-group input-group-sm">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          Small
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default"
                        >
                          Default
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="input-group input-group-lg">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-lg"
                        >
                          Large
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Input Group Sizing --&gt;{"\n"}&lt;div
                      class="input-group input-group-sm"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="inputGroup-sizing-sm"&gt;Small&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="inputGroup-sizing-default"&gt;Default&lt;/span&gt;
                      {"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;div class="input-group input-group-lg"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"
                      id="inputGroup-sizing-lg"&gt;Large&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Multiple Inputs</h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="input-group-multiple-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="input-group-multiple-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <p className="text-muted">
                  While multiple <code>&lt;input&gt;</code>s are supported
                  visually, validation styles are only available for input
                  groups with a single <code>&lt;input&gt;</code>.
                </p>
                <div className="live-preview">
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      First and last name
                    </span>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control"
                    />
                    <input
                      type="text"
                      aria-label="Last name"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Dollar amount (with dot and two decimal places)"
                    />
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Multiple Inputs --&gt;{"\n"}&lt;div
                      class="input-group mb-3"&gt;{"\n"}
                      {"    "}&lt;span class="input-group-text"&gt;First and
                      last name&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" aria-label="First name"
                      class="form-control"&gt;{"\n"}
                      {"    "}&lt;input type="text" aria-label="Last name"
                      class="form-control"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;div class="input-group mb-3"&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;$&lt;/span&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;0.00&lt;/span&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Dollar amount (with dot and two decimal
                      places)"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"    "}
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Dollar amount (with dot and two decimal
                      places)"&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;$&lt;/span&gt;{"\n"}
                      {"    "}&lt;span
                      class="input-group-text"&gt;0.00&lt;/span&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Buttons, Checkboxs and Radios Group
                </h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="input-group-btncheck-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="input-group-btncheck-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <div className="live-preview">
                  <div>
                    <p className="text-muted">
                      Use any checkbox, radio, or button option within an input
                      group’s addon instead of text. We recommend adding{" "}
                      <code>mt-0</code> class to the{" "}
                      <code>form-check-input</code> when there’s no visible text
                      next to the input.
                    </p>
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="input-group">
                          <div className="input-group-text">
                            <input
                              className="form-check-input mt-0"
                              type="checkbox"
                              defaultValue=""
                              aria-label="Checkbox for following text input"
                            />
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with checkbox"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <div className="input-group-text">
                            <input
                              className="form-check-input mt-0"
                              type="radio"
                              defaultValue=""
                              aria-label="Radio button for following text input"
                            />
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with radio button"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-primary material-shadow-none"
                            type="button"
                            id="button-addon1"
                          >
                            Button
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                          />
                          <button
                            className="btn btn-outline-success material-shadow-none"
                            type="button"
                            id="button-addon2"
                          >
                            Button
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <button className="btn btn-primary" type="button">
                            Button
                          </button>
                          <button className="btn btn-success" type="button">
                            Button
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            aria-label="Example text with two button addons"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Recipient's username with two button addons"
                          />
                          <button className="btn btn-primary" type="button">
                            Button
                          </button>
                          <button className="btn btn-success" type="button">
                            Button
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Checkbox Input --&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;div class="input-group-text"&gt;{"\n"}
                      {"        "}&lt;input class="form-check-input mt-0"
                      type="checkbox" value="" aria-label="Checkbox for
                      following text input"&gt;{"\n"}
                      {"    "}&lt;/div&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Text input with checkbox"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Radio Input --&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;div class="input-group-text"&gt;{"\n"}
                      {"        "}&lt;input class="form-check-input mt-0"
                      type="radio" value="" aria-label="Radio button for
                      following text input"&gt;{"\n"}
                      {"    "}&lt;/div&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Text input with radio button"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- Buttons Input --&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-primary"
                      type="button" id="button-addon1"&gt;Button&lt;/button&gt;
                      {"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="" aria-label="Example text with button addon"
                      aria-describedby="button-addon1"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-success"
                      type="button" id="button-addon2"&gt;Button&lt;/button&gt;
                      {"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-primary"
                      type="button"&gt;Button&lt;/button&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-success"
                      type="button"&gt;Button&lt;/button&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      placeholder="" aria-label="Example text with two button
                      addons"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Recipient's username with two button
                      addons"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-primary"
                      type="button"&gt;Button&lt;/button&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-success"
                      type="button"&gt;Button&lt;/button&gt;{"\n"}&lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Buttons with dropdowns
                </h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="input-group-dropdown-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="input-group-dropdown-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <div className="live-preview">
                  <div>
                    <p className="text-muted">
                      You can use a button with the dropdown toggle to set the
                      file input group.
                    </p>
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="input-group">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Separated link
                              </a>
                            </li>
                          </ul>
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                          />
                          <button
                            className="btn btn-success dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Separated link
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary material-shadow-none dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action before
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action before
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Separated link
                              </a>
                            </li>
                          </ul>
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with 2 dropdown buttons"
                          />
                          <button
                            className="btn btn-outline-secondary material-shadow-none dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Separated link
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Buttons with dropdowns --&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-primary dropdown-toggle"
                      type="button" data-bs-toggle="dropdown"
                      aria-expanded="false"&gt;Dropdown&lt;/button&gt;{"\n"}
                      {"    "}&lt;ul class="dropdown-menu"&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;hr
                      class="dropdown-divider"&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"    "}&lt;/ul&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Text input with dropdown button"&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Text input with dropdown button"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-success dropdown-toggle"
                      type="button" data-bs-toggle="dropdown"
                      aria-expanded="false"&gt;Dropdown&lt;/button&gt;{"\n"}
                      {"    "}&lt;ul class="dropdown-menu dropdown-menu-end"&gt;
                      {"\n"}
                      {"      "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;hr
                      class="dropdown-divider"&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"    "}&lt;/ul&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-secondary
                      dropdown-toggle" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false"&gt;Dropdown&lt;/button&gt;{"\n"}
                      {"    "}&lt;ul class="dropdown-menu"&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Action before&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Another action before&lt;/a&gt;&lt;/li&gt;
                      {"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;hr
                      class="dropdown-divider"&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"    "}&lt;/ul&gt;{"\n"}
                      {"    "}&lt;input type="text" class="form-control"
                      aria-label="Text input with 2 dropdown buttons"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-secondary
                      dropdown-toggle" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false"&gt;Dropdown&lt;/button&gt;{"\n"}
                      {"    "}&lt;ul class="dropdown-menu dropdown-menu-end"&gt;
                      {"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;hr
                      class="dropdown-divider"&gt;&lt;/li&gt;{"\n"}
                      {"        "}&lt;li&gt;&lt;a class="dropdown-item"
                      href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;{"\n"}
                      {"    "}&lt;/ul&gt;{"\n"}&lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Custom Forms</h4>
                <div className="flex-shrink-0">
                  <div className="form-check form-switch form-switch-right form-switch-md">
                    <label
                      htmlFor="input-group-custom-showcode"
                      className="form-label text-muted"
                    >
                      Show Code
                    </label>
                    <input
                      className="form-check-input code-switcher"
                      type="checkbox"
                      id="input-group-custom-showcode"
                    />
                  </div>
                </div>
              </div>
              {/* end card header */}
              <div className="card-body">
                <p className="text-muted">
                  Input groups include support for custom selects and custom
                  file inputs. Browser default versions of these are not
                  supported.
                </p>
                <div className="live-preview">
                  <div>
                    <h5 className="fs-15 mb-3">Select</h5>
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="input-group">
                          <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect01"
                          >
                            Options
                          </label>
                          <select
                            className="form-select"
                            id="inputGroupSelect01"
                          >
                            <option selected="">Choose...</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="inputGroupSelect02"
                          >
                            <option selected="">Choose...</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                          </select>
                          <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect02"
                          >
                            Options
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-primary material-shadow-none"
                            type="button"
                          >
                            Button
                          </button>
                          <select
                            className="form-select"
                            id="inputGroupSelect03"
                            aria-label="Example select with button addon"
                          >
                            <option selected="">Choose...</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="inputGroupSelect04"
                            aria-label="Example select with button addon"
                          >
                            <option selected="">Choose...</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                          </select>
                          <button
                            className="btn btn-outline-secondary material-shadow-none"
                            type="button"
                          >
                            Button
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="fs-15 mb-3">File Input</h5>
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="input-group">
                          <label
                            className="input-group-text"
                            htmlFor="inputGroupFile01"
                          >
                            Upload
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile01"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                          />
                          <label
                            className="input-group-text"
                            htmlFor="inputGroupFile02"
                          >
                            Upload
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-primary material-shadow-none"
                            type="button"
                            id="inputGroupFileAddon03"
                          >
                            Button
                          </button>
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile03"
                            aria-describedby="inputGroupFileAddon03"
                            aria-label="Upload"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                          />
                          <button
                            className="btn btn-outline-success material-shadow-none"
                            type="button"
                            id="inputGroupFileAddon04"
                          >
                            Button
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-none code-view">
                  <pre className="language-markup" style={{ height: 275 }}>
                    <code>
                      &lt;!-- Select --&gt;{"\n"}&lt;div class="input-group"&gt;
                      {"\n"}
                      {"    "}&lt;label class="input-group-text"
                      for="inputGroupSelect01"&gt;Options&lt;/label&gt;{"\n"}
                      {"    "}&lt;select class="form-select"
                      id="inputGroupSelect01"&gt;{"\n"}
                      {"        "}&lt;option
                      selected&gt;Choose...&lt;/option&gt;{"\n"}
                      {"        "}&lt;option value="1"&gt;One&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="2"&gt;Two&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="3"&gt;Three&lt;/option&gt;
                      {"\n"}
                      {"    "}&lt;/select&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;select class="form-select"
                      id="inputGroupSelect02"&gt;{"\n"}
                      {"        "}&lt;option
                      selected&gt;Choose...&lt;/option&gt;{"\n"}
                      {"        "}&lt;option value="1"&gt;One&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="2"&gt;Two&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="3"&gt;Three&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;/select&gt;{"\n"}
                      {"    "}&lt;label class="input-group-text"
                      for="inputGroupSelect02"&gt;Options&lt;/label&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-primary"
                      type="button"&gt;Button&lt;/button&gt;{"\n"}
                      {"    "}&lt;select class="form-select"
                      id="inputGroupSelect03" aria-label="Example select with
                      button addon"&gt;{"\n"}
                      {"        "}&lt;option
                      selected&gt;Choose...&lt;/option&gt;{"\n"}
                      {"        "}&lt;option value="1"&gt;One&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="2"&gt;Two&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="3"&gt;Three&lt;/option&gt;
                      {"\n"}
                      {"    "}&lt;/select&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;select class="form-select"
                      id="inputGroupSelect04" aria-label="Example select with
                      button addon"&gt;{"\n"}
                      {"        "}&lt;option
                      selected&gt;Choose...&lt;/option&gt;{"\n"}
                      {"        "}&lt;option value="1"&gt;One&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="2"&gt;Two&lt;/option&gt;
                      {"\n"}
                      {"        "}&lt;option value="3"&gt;Three&lt;/option&gt;
                      {"\n"}
                      {"    "}&lt;/select&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-secondary"
                      type="button"&gt;Button&lt;/button&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    {"\n"}
                    <code>
                      &lt;!-- File Input --&gt;{"\n"}&lt;div
                      class="input-group"&gt;{"\n"}
                      {"    "}&lt;label class="input-group-text"
                      for="inputGroupFile01"&gt;Upload&lt;/label&gt;{"\n"}
                      {"    "}&lt;input type="file" class="form-control"
                      id="inputGroupFile01"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="file" class="form-control"
                      id="inputGroupFile02"&gt;{"\n"}
                      {"    "}&lt;label class="input-group-text"
                      for="inputGroupFile02"&gt;Upload&lt;/label&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-primary
                      material-shadow-none" type="button"
                      id="inputGroupFileAddon03"&gt;Button&lt;/button&gt;{"\n"}
                      {"    "}&lt;input type="file" class="form-control"
                      id="inputGroupFile03"
                      aria-describedby="inputGroupFileAddon03"
                      aria-label="Upload"&gt;{"\n"}&lt;/div&gt;
                    </code>
                    {"\n"}
                    <code>
                      &lt;div class="input-group"&gt;{"\n"}
                      {"    "}&lt;input type="file" class="form-control"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"&gt;{"\n"}
                      {"    "}&lt;button class="btn btn-outline-success
                      material-shadow-none" type="button"
                      id="inputGroupFileAddon04"&gt;Button&lt;/button&gt;{"\n"}
                      &lt;/div&gt;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>{" "}
      {/* container-fluid */}
    </div>
    {/* End Page-content */}
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">© Velzon.</div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design &amp; Develop by Themesbrand
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  {/* end main content*/}
        </>
    )
}
export default AddWorkerRight;